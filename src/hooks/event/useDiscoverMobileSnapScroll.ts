import { useCallback, useEffect, useRef } from "react"
import type { DiscoverEvent } from "@/types/discover"

type UseDiscoverMobileSnapScrollParams = {
    enabled: boolean
    events: DiscoverEvent[]
}

type EventCardRefCallback = (element: HTMLDivElement | null) => void

const mobileSnapVisibilityThreshold = 0.15

export function useDiscoverMobileSnapScroll({
    enabled,
    events,
}: Readonly<UseDiscoverMobileSnapScrollParams>) {
    const eventCardRefs = useRef(new Map<string, HTMLDivElement>())
    const eventCardRefCallbacks = useRef(new Map<string, EventCardRefCallback>())
    const lastScrollYRef = useRef(0)
    const scrollDirectionRef = useRef<"up" | "down">("down")
    const registerEventCard = useCallback((eventId: string) => {
        const existingCallback = eventCardRefCallbacks.current.get(eventId)

        if (existingCallback) {
            return existingCallback
        }

        const callback: EventCardRefCallback = (element) => {
            if (element) {
                eventCardRefs.current.set(eventId, element)
                return
            }

            eventCardRefs.current.delete(eventId)
        }

        eventCardRefCallbacks.current.set(eventId, callback)
        return callback
    }, [])

    useEffect(() => {
        const eventIds = new Set(events.map((event) => event._id))

        for (const eventId of eventCardRefs.current.keys()) {
            if (!eventIds.has(eventId)) {
                eventCardRefs.current.delete(eventId)
            }
        }

        for (const eventId of eventCardRefCallbacks.current.keys()) {
            if (!eventIds.has(eventId)) {
                eventCardRefCallbacks.current.delete(eventId)
            }
        }
    }, [events])

    useEffect(() => {
        if (typeof globalThis.window === "undefined" || typeof globalThis.matchMedia !== "function") {
            return
        }

        const mobileMediaQuery = globalThis.matchMedia("(max-width: 767px)")

        if (!mobileMediaQuery.matches || !enabled || events.length === 0) {
            return
        }

        let scrollTimeout: ReturnType<typeof globalThis.setTimeout> | undefined
        let isSnapping = false
        let hasUserScrollIntent = false

        function getStickyOffset() {
            const filterBar = globalThis.document.querySelector<HTMLElement>("[data-discover-filter-bar]")
            return filterBar ? filterBar.getBoundingClientRect().height + 8 : 0
        }

        function snapToVisibleCard() {
            if (isSnapping) {
                return
            }

            const scrollTop = globalThis.scrollY
            const stickyOffset = getStickyOffset()
            const cardElements = events
                .map((event) => eventCardRefs.current.get(event._id))
                .filter((element): element is HTMLDivElement => Boolean(element))

            if (cardElements.length === 0) {
                return
            }

            const visibleCards = cardElements
                .map((card, index) => {
                    const rect = card.getBoundingClientRect()
                    const absoluteTop = rect.top + scrollTop
                    const visibleTop = Math.max(rect.top, stickyOffset)
                    const visibleBottom = Math.min(rect.bottom, globalThis.innerHeight)
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
                    const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0
                    const titleElement = card.querySelector<HTMLElement>("[data-discover-event-title]")
                    const titleRect = titleElement?.getBoundingClientRect()
                    const titleVisible = titleRect
                        ? titleRect.bottom > stickyOffset && titleRect.top < globalThis.innerHeight
                        : false

                    return {
                        absoluteTop,
                        index,
                        visibleRatio,
                        titleVisible,
                    }
                })
                .filter((card) => card.visibleRatio >= mobileSnapVisibilityThreshold)

            if (visibleCards.length === 0) {
                return
            }

            const downwardCandidates = visibleCards.filter(
                (card) => card.titleVisible && card.absoluteTop > scrollTop + 8,
            )
            const targetCard = scrollDirectionRef.current === "up"
                ? visibleCards[0]
                : downwardCandidates.at(-1)

            if (!targetCard) {
                return
            }

            if (scrollDirectionRef.current === "up" && targetCard.index === 0) {
                return
            }

            const targetTop = Math.max(0, targetCard.absoluteTop - stickyOffset)

            if (Math.abs(targetTop - scrollTop) < 12) {
                return
            }

            isSnapping = true
            globalThis.scrollTo({
                top: targetTop,
                behavior: globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            })

            globalThis.setTimeout(() => {
                isSnapping = false
            }, 220)
        }

        function handleScroll() {
            if (isSnapping) {
                return
            }

            const nextScrollY = globalThis.scrollY

            if (nextScrollY > lastScrollYRef.current) {
                scrollDirectionRef.current = "down"
            } else if (nextScrollY < lastScrollYRef.current) {
                scrollDirectionRef.current = "up"
            }

            lastScrollYRef.current = nextScrollY

            if (!hasUserScrollIntent) {
                return
            }

            if (scrollTimeout) {
                globalThis.clearTimeout(scrollTimeout)
            }

            // Wait until user-driven scrolling settles, then snap once.
            scrollTimeout = globalThis.setTimeout(() => {
                hasUserScrollIntent = false
                snapToVisibleCard()
            }, 120)
        }

        function markUserScrollIntent() {
            hasUserScrollIntent = true
        }

        lastScrollYRef.current = globalThis.scrollY
        globalThis.addEventListener("touchstart", markUserScrollIntent, { passive: true })
        globalThis.addEventListener("wheel", markUserScrollIntent, { passive: true })
        globalThis.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            if (scrollTimeout) {
                globalThis.clearTimeout(scrollTimeout)
            }

            globalThis.removeEventListener("touchstart", markUserScrollIntent)
            globalThis.removeEventListener("wheel", markUserScrollIntent)
            globalThis.removeEventListener("scroll", handleScroll)
        }
    }, [enabled, events])

    return { registerEventCard }
}
