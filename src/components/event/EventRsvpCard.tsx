import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ComponentProps,
    type PropsWithChildren,
} from "react"
import { Link, useNavigate } from "react-router"
import { Check, HelpCircle, Minus, Plus } from "lucide-react"
import { toast } from "sonner"
import type { Event } from "@/types/Event"
import WindowCard from "@/components/ui/window-card"
import BrutalButton from "@/components/ui/brutal-button"
import {
    createEventRsvp,
    updateEventRsvp,
    type EventRsvpStatus,
} from "@/requests/event"
import {
    formatEventFee,
    getEventCapacityDisplay,
} from "@/components/event/event-utils"
import { isLoggedIn } from "@/helpers/auth"
import { testIds } from "@/testIds"
import { cn } from "@/lib/utils"

type EventRsvpCardProps = PropsWithChildren & Omit<ComponentProps<typeof WindowCard>, "children"> & {
    event: Event
}

type RsvpChoiceStatus = Extract<EventRsvpStatus, "confirmed" | "maybe">

type EventRsvpCardContextValue = {
    event: Event
    selectedStatus: EventRsvpStatus | null
    submittingStatus: EventRsvpStatus | null
    loggedIn: boolean
    additionalGuests: number
    onRsvp: (status: EventRsvpStatus) => void
    onAdjustAdditionalGuests: (nextValue: number) => void
}

type RsvpChoiceButtonProps = {
    status: RsvpChoiceStatus
    selectedStatus: EventRsvpStatus | null
    submittingStatus: EventRsvpStatus | null
    disabled: boolean
    onSelect: (status: EventRsvpStatus) => void
}

type GuestStepperControlProps = {
    value: number
    onChange: (nextValue: number) => void
}

const EventRsvpCardContext = createContext<EventRsvpCardContextValue | undefined>(undefined)

function useEventRsvpCardContext() {
    const context = useContext(EventRsvpCardContext)

    if (!context) {
        throw new Error("useEventRsvpCardContext must be within an EventRsvpCard")
    }

    return context
}

function PriceCapacitySection() {
    const { event } = useEventRsvpCardContext()
    const capacity = getEventCapacityDisplay(event)
    const progressPercent = capacity.progressPercent ?? 0

    return (
        <>
            <p className="whitespace-nowrap text-center font-heading text-5xl font-black uppercase leading-none text-foreground md:text-6xl">
                {formatEventFee(event)}
            </p>

            <div className="mt-5">
                <div className="flex items-end justify-between gap-4">
                    <p className="font-heading text-lg font-black uppercase leading-tight">{capacity.label}</p>
                    <p className="text-right font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/65">
                        {capacity.helper}
                    </p>
                </div>
                <div
                    className="mt-3 h-4 overflow-hidden border-[3px] border-border bg-card shadow-[3px_3px_0_0_hsl(var(--border))]"
                    aria-label={capacity.label}
                >
                    <div
                        className={cn(
                            "h-full bg-mint transition-[width] duration-300",
                            capacity.progressPercent === null && "bg-[repeating-linear-gradient(135deg,#B8F2C8_0,#B8F2C8_6px,#fff_6px,#fff_12px)]",
                        )}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </>
    )
}

function RsvpChoiceButton({
    status,
    selectedStatus,
    submittingStatus,
    disabled,
    onSelect,
}: Readonly<RsvpChoiceButtonProps>) {
    const isGoing = status === "confirmed"
    const isSelected = selectedStatus === status
    const Icon = isGoing ? Check : HelpCircle
    const label = isGoing ? "GOING" : "MAYBE"
    const savingLabel = submittingStatus === status ? "SAVING" : label
    let tone: ComponentProps<typeof BrutalButton>["tone"] = "cream"

    if (isSelected) {
        tone = isGoing ? "mint" : "violet"
    }

    return (
        <BrutalButton
            tone={tone}
            className={cn(
                "min-w-0 justify-center gap-2 px-3 text-xs",
                isSelected && "shadow-none translate-x-1 translate-y-1",
            )}
            onClick={() => onSelect(status)}
            disabled={disabled}
        >
            <Icon className="h-4 w-4 shrink-0 stroke-[3]" aria-hidden="true" />
            {savingLabel}
        </BrutalButton>
    )
}

function GuestStepperControl({ value, onChange }: Readonly<GuestStepperControlProps>) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/70">
                Additional guests
            </span>
            <div className="flex shrink-0 items-center">
                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center border-[3px] border-border bg-card transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => onChange(value - 1)}
                    disabled={value === 0}
                    aria-label="Remove additional guest"
                >
                    <Minus className="h-4 w-4 stroke-[4]" aria-hidden="true" />
                </button>
                <span className="flex h-11 w-12 items-center justify-center border-y-[3px] border-border bg-card font-display text-xl font-extrabold">
                    {value}
                </span>
                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center border-[3px] border-border bg-card transition hover:bg-mint"
                    onClick={() => onChange(value + 1)}
                    aria-label="Add additional guest"
                >
                    <Plus className="h-4 w-4 stroke-[4]" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

function AuthActionLinks() {
    return (
        <div className="mt-4 grid gap-3">
            <BrutalButton asChild tone="mint" className="w-full">
                <Link to="/login" data-testid={testIds.event.rsvpLoginLink}>Log in to join</Link>
            </BrutalButton>
            <BrutalButton asChild tone="cream" className="w-full">
                <Link to="/register">Create an account</Link>
            </BrutalButton>
        </div>
    )
}

function GuestStepper() {
    const { additionalGuests, onAdjustAdditionalGuests } = useEventRsvpCardContext()

    return <GuestStepperControl value={additionalGuests} onChange={onAdjustAdditionalGuests} />
}

function CancelButton() {
    const { loggedIn, selectedStatus, submittingStatus, onRsvp } = useEventRsvpCardContext()

    if (loggedIn) {
        return (
            <button
                type="button"
                className={cn(
                    "w-full text-center text-sm font-black underline decoration-[2px] underline-offset-4 transition hover:text-violet",
                    selectedStatus === "canceled" && "text-violet",
                )}
                onClick={() => onRsvp("canceled")}
                disabled={submittingStatus !== null}
            >
                {submittingStatus === "canceled" ? "Saving..." : "Can't Go"}
            </button>
        )
    }

    return null
}

function ParticipationPanel() {
    const {
        loggedIn,
        selectedStatus,
        submittingStatus,
        onRsvp,
    } = useEventRsvpCardContext()
    const rsvpDisabled = loggedIn ? submittingStatus !== null : true
    const disabledContentClassName = loggedIn ? undefined : "pointer-events-none opacity-70"
    const authActionLinks = loggedIn ? null : <AuthActionLinks />

    return (
        <div className="relative mt-6 overflow-hidden border-y-[3px] border-border py-4">
            <div className={cn("space-y-4", disabledContentClassName)}>
                <div className="grid grid-cols-2 gap-3">
                    {(["confirmed", "maybe"] as const).map((status) => (
                        <RsvpChoiceButton
                            key={status}
                            status={status}
                            selectedStatus={selectedStatus}
                            submittingStatus={submittingStatus}
                            disabled={rsvpDisabled}
                            onSelect={onRsvp}
                        />
                    ))}
                </div>

                {loggedIn ? (
                    <>
                        <GuestStepper />
                        <CancelButton />
                    </>
                ) : null}
            </div>

            {authActionLinks}
        </div>
    )
}

function EventRsvpCardRoot({
    event,
    children,
    titlebarLabel = "JOIN THIS EVENT",
    className,
    ...props
}: Readonly<EventRsvpCardProps>) {
    const navigate = useNavigate()
    const loggedIn = isLoggedIn()
    const initialRsvp = event.currentUserRsvp
    const initialRsvpId = initialRsvp?.id ?? initialRsvp?._id
    const [additionalGuests, setAdditionalGuests] = useState(initialRsvp?.additionalGuests ?? 0)
    const [selectedStatus, setSelectedStatus] = useState<EventRsvpStatus | null>(
        initialRsvp?.status ?? null,
    )
    const [rsvpId, setRsvpId] = useState(initialRsvpId)
    const [submittingStatus, setSubmittingStatus] = useState<EventRsvpStatus | null>(null)

    const handleRsvp = useCallback(async (status: EventRsvpStatus) => {
        setSubmittingStatus(status)

        try {
            const response = rsvpId
                ? await updateEventRsvp(rsvpId, { status, additionalGuests })
                : await createEventRsvp({
                    eventId: event._id,
                    status,
                    additionalGuests,
                })
            setRsvpId(response.id ?? response._id ?? rsvpId)
            setSelectedStatus(status)

            if (status === "confirmed") {
                toast("You are on the guest list.")
            } else if (status === "maybe") {
                toast("Marked as maybe.")
            } else {
                toast("RSVP canceled.")
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Could not update RSVP"

            if (message === "Unauthorized") {
                navigate("/login")
                return
            }

            toast(message)
        } finally {
            setSubmittingStatus(null)
        }
    }, [additionalGuests, event._id, navigate, rsvpId])

    const adjustAdditionalGuests = useCallback((nextValue: number) => {
        setAdditionalGuests(Math.min(10, Math.max(0, nextValue)))
    }, [])
    const contextValue = useMemo<EventRsvpCardContextValue>(() => ({
        event,
        loggedIn,
        selectedStatus,
        submittingStatus,
        additionalGuests,
        onRsvp: handleRsvp,
        onAdjustAdditionalGuests: adjustAdditionalGuests,
    }), [
        additionalGuests,
        adjustAdditionalGuests,
        event,
        handleRsvp,
        loggedIn,
        selectedStatus,
        submittingStatus,
    ])

    return (
        <WindowCard
            data-testid={testIds.event.rsvpCard}
            titlebarLabel={titlebarLabel}
            className={cn(
                "rounded-none motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500",
                className,
            )}
            {...props}
        >
            <EventRsvpCardContext.Provider value={contextValue}>
                <div className="p-5 md:p-6">
                    {children ?? (
                        <>
                            <PriceCapacitySection />
                            <ParticipationPanel />
                        </>
                    )}
                </div>
            </EventRsvpCardContext.Provider>
        </WindowCard>
    )
}

const EventRsvpCard = Object.assign(EventRsvpCardRoot, {
    PriceCapacity: PriceCapacitySection,
    Participation: ParticipationPanel,
    GuestStepper,
    CancelButton,
    AuthActions: AuthActionLinks,
})

export default EventRsvpCard
