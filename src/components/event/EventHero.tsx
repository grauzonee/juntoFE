import type { Event } from "@/types/Event"
import WindowCard from "@/components/ui/window-card"
import PillBadge from "@/components/ui/pill-badge"
import {
    formatEventDateBadge,
    formatEventFee,
    getEventLocationLabel,
    splitEventDescription,
} from "@/components/event/event-utils"
import { testIds } from "@/testIds"

type EventHeroProps = {
    event: Event
}

const categoryTones = ["white", "mint", "yellow"] as const

export default function EventHero({ event }: EventHeroProps) {
    const excerpt = splitEventDescription(event.description)[0]

    return (
        <section data-testid={testIds.event.hero} className="relative isolate pb-10 md:pb-14">
            <div className="relative h-[20rem] overflow-hidden border-b-brutal border-border bg-violet-light sm:h-[24rem] lg:h-[30rem]">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,248,231,0.14)_25%,transparent_25%,transparent_50%,rgba(255,248,231,0.14)_50%,rgba(255,248,231,0.14)_75%,transparent_75%,transparent)] bg-[length:22px_22px] opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-5 left-4 right-4 z-30 mx-auto max-w-7xl md:bottom-7 md:px-2">
                    <p className="inline-flex border-2 border-border bg-yellow px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] shadow-brutal-sm">
                        {event.type.title}
                    </p>
                </div>
            </div>

            <div className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 md:-mt-16 md:px-6">
                <WindowCard titlebarLabel="Event details" className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-6 motion-safe:duration-500">
                    <div className="px-5 py-6 md:px-8 md:py-8">
                        <div>
                            <h1 className="max-w-full break-words font-display text-[2rem] font-extrabold leading-none tracking-normal [overflow-wrap:anywhere] sm:max-w-4xl sm:text-5xl lg:text-[4rem]">
                                {event.title}
                            </h1>

                            {excerpt ? (
                                <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/75 md:text-lg">
                                    {excerpt}
                                </p>
                            ) : null}

                            <div className="mt-5">
                                <PillBadge tone="yellow" className="w-full px-4 py-2 text-center sm:w-fit">
                                    {formatEventDateBadge(event.date)}
                                </PillBadge>
                            </div>

                            <div className="mt-5">
                                <PillBadge
                                    tone="mint"
                                    className="w-full border-brutal px-4 py-3 text-center font-display text-lg font-extrabold tracking-normal shadow-brutal-sm sm:w-fit sm:border-2 sm:py-2 sm:font-mono sm:text-[10px] sm:tracking-[0.18em] sm:shadow-none"
                                >
                                    {formatEventFee(event)}
                                </PillBadge>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <PillBadge tone="white">{getEventLocationLabel(event.fullAddress)}</PillBadge>
                            {event.categories.map((category, index) => (
                                <PillBadge key={category.id} tone={categoryTones[index % categoryTones.length]}>
                                    {category.title}
                                </PillBadge>
                            ))}
                        </div>
                    </div>
                </WindowCard>
            </div>
        </section>
    )
}
