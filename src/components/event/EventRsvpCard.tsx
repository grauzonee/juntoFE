import {
    createContext,
    useContext,
    useState,
    type ComponentProps,
    type PropsWithChildren,
} from "react"
import { Link } from "react-router"
import { Check, HelpCircle, Minus, Plus, X } from "lucide-react"
import type { Event } from "@/types/Event"
import WindowCard from "@/components/ui/window-card"
import BrutalButton from "@/components/ui/brutal-button"
import type { EventRsvpStatus } from "@/requests/event"
import {
    formatEventFee,
    getEventCapacityDisplay,
} from "@/components/event/event-utils"
import {
    defaultResponsiveVariant,
    isMobile,
    responsiveVariants,
    type ResponsiveVariant,
} from "@/helpers/responsive"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    useEventRsvp,
    type UseEventRsvpValue,
} from "@/hooks/event/useEventRsvp"
import { testIds } from "@/testIds"
import { cn } from "@/lib/utils"

type EventRsvpCardProps = PropsWithChildren & Omit<ComponentProps<typeof WindowCard>, "children" | "variant"> & {
    event?: Event
}

type EventRsvpMobilePanelProps = {
    event?: Event
    className?: string
}

type RsvpChoiceButtonsProps = {
    selectedStatus: EventRsvpStatus | null
    submittingStatus: EventRsvpStatus | null
    disabled: boolean
    onSelect: (status: EventRsvpStatus) => void
    className?: string
    buttonClassName?: string
}

type AuthActionLinksProps = {
    variant?: ResponsiveVariant
}

type RsvpActionsProps = {
    variant?: ResponsiveVariant
}

type GuestStepperProps = {
    variant?: ResponsiveVariant
}

type MobileGuestRsvpDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type RsvpPanelProps = Omit<EventRsvpCardProps, "event"> & {
    variant?: ResponsiveVariant
}

const EventRsvpCardContext = createContext<UseEventRsvpValue | undefined>(undefined)

// Reads shared RSVP state for the card and mobile panel subtree.
function useEventRsvpCardContext() {
    const context = useContext(EventRsvpCardContext)

    if (!context) {
        throw new Error("useEventRsvpCardContext must be within an EventRsvpCard")
    }

    return context
}

// Provides shared RSVP state and actions for all RSVP presentation variants.
export function EventRsvpProvider({ event, children }: Readonly<PropsWithChildren<{ event: Event }>>) {
    const contextValue = useEventRsvp(event)

    return (
        <EventRsvpCardContext.Provider value={contextValue}>
            {children}
        </EventRsvpCardContext.Provider>
    )
}

// Shows event price and capacity in desktop or mobile layout.
function PriceCapacitySummary({ variant = defaultResponsiveVariant }: Readonly<{ variant?: ResponsiveVariant }>) {
    const { event } = useEventRsvpCardContext()
    const capacity = getEventCapacityDisplay(event)
    const progressPercent = capacity.progressPercent ?? 0

    if (isMobile(variant)) {
        return (
            <div className="min-w-0">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/65">
                    Join this event
                </p>
                <p className="mt-1 truncate font-heading text-2xl font-black uppercase leading-none text-foreground">
                    {formatEventFee(event)}
                </p>
                <p className="mt-1 truncate text-xs font-bold leading-tight text-foreground/70">
                    {capacity.label}
                </p>
                <div
                    className="mt-2 h-2 overflow-hidden border-2 border-border bg-card"
                    aria-label={capacity.label}
                >
                    <div
                        className={cn(
                            "h-full bg-mint transition-[width] duration-300",
                            capacity.progressPercent === null && "bg-[repeating-linear-gradient(135deg,#B8F2C8_0,#B8F2C8_4px,#fff_4px,#fff_8px)]",
                        )}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        )
    }

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

// Renders the primary RSVP choice buttons for confirmed and maybe statuses.
function RsvpChoiceButtons({
    selectedStatus,
    submittingStatus,
    disabled,
    onSelect,
    className,
    buttonClassName,
}: Readonly<RsvpChoiceButtonsProps>) {
    return (
        <div className={className}>
            {(["confirmed", "maybe"] as const).map((status) => {
                const isGoing = status === "confirmed"
                const isCancelingAttendance = isGoing && selectedStatus === "confirmed"
                const actionStatus: EventRsvpStatus = isCancelingAttendance ? "canceled" : status
                const isSelected = selectedStatus === status && !isCancelingAttendance
                let Icon = isGoing ? Check : HelpCircle
                let label = isGoing ? "ATTEND" : "MAYBE"
                let tone: ComponentProps<typeof BrutalButton>["tone"] = "cream"

                if (isCancelingAttendance) {
                    Icon = X
                    label = "CAN'T GO"
                    tone = "destructive"
                } else if (isSelected) {
                    tone = isGoing ? "mint" : "violet"
                }

                const savingLabel = submittingStatus === actionStatus ? "SAVING" : label

                return (
                    <BrutalButton
                        key={status}
                        type="button"
                        tone={tone}
                        className={cn(
                            "min-w-0 justify-center gap-2 px-3 text-xs",
                            isSelected && "shadow-none translate-x-1 translate-y-1",
                            buttonClassName,
                        )}
                        onClick={() => onSelect(actionStatus)}
                        disabled={disabled}
                    >
                        <Icon className="h-4 w-4 shrink-0 stroke-[3]" aria-hidden="true" />
                        {savingLabel}
                    </BrutalButton>
                )
            })}
        </div>
    )
}

// Lets logged-in users adjust the number of additional guests.
function GuestStepper({
    variant = defaultResponsiveVariant,
}: Readonly<GuestStepperProps>) {
    const { additionalGuests, onAdjustAdditionalGuests } = useEventRsvpCardContext()
    const mobile = isMobile(variant)

    return (
        <div className={cn("flex items-center gap-4", mobile ? "justify-center" : "justify-between")}>
            {mobile ? null : (
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/70">
                    Additional guests
                </span>
            )}
            <div className="flex shrink-0 items-center">
                <button
                    type="button"
                    className={cn(
                        "flex items-center justify-center border-[3px] border-border bg-card transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-50",
                        mobile ? "h-14 w-14" : "h-11 w-11",
                    )}
                    onClick={() => onAdjustAdditionalGuests(additionalGuests - 1)}
                    disabled={additionalGuests === 0}
                    aria-label="Remove additional guest"
                >
                    <Minus className={cn("stroke-[4]", mobile ? "h-5 w-5" : "h-4 w-4")} aria-hidden="true" />
                </button>
                <span
                    className={cn(
                        "flex items-center justify-center border-y-[3px] border-border bg-card font-display",
                        mobile ? "h-14 w-16 text-4xl font-black" : "h-11 w-12 text-xl font-extrabold",
                    )}
                >
                    {additionalGuests}
                </span>
                <button
                    type="button"
                    className={cn(
                        "flex items-center justify-center border-[3px] border-border bg-card transition hover:bg-mint",
                        mobile ? "h-14 w-14" : "h-11 w-11",
                    )}
                    onClick={() => onAdjustAdditionalGuests(additionalGuests + 1)}
                    aria-label="Add additional guest"
                >
                    <Plus className={cn("stroke-[4]", mobile ? "h-5 w-5" : "h-4 w-4")} aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

// Confirms mobile "Going" RSVP after users choose their guest count.
function MobileGuestRsvpDialog({ open, onOpenChange }: Readonly<MobileGuestRsvpDialogProps>) {
    const { submittingStatus, onRsvp } = useEventRsvpCardContext()
    const submitting = submittingStatus === "confirmed"

    async function handleConfirm() {
        await onRsvp("confirmed")
        onOpenChange(false)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (submittingStatus === null) {
                    onOpenChange(nextOpen)
                }
            }}
        >
            <DialogContent
                aria-describedby={undefined}
                className="w-[calc(100%-2rem)] max-w-sm rounded-none border-[3px] border-border bg-event-surface p-0 shadow-brutal"
            >
                <DialogHeader className="border-b-[3px] border-border bg-cream px-5 pb-4 pt-6 text-left">
                    <DialogTitle className="font-heading text-2xl font-black uppercase leading-none">
                        Additional guests
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 p-5">
                    <GuestStepper variant={responsiveVariants.mobile} />
                    <BrutalButton
                        type="button"
                        tone="mint"
                        className="w-full justify-center gap-2"
                        onClick={handleConfirm}
                        disabled={submittingStatus !== null}
                    >
                        <Check className="h-4 w-4 shrink-0 stroke-[3]" aria-hidden="true" />
                        {submitting ? "SAVING" : "CONFIRM"}
                    </BrutalButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Shows login and registration links for users who cannot RSVP yet.
function AuthActionLinks({ variant = defaultResponsiveVariant }: Readonly<AuthActionLinksProps>) {
    const mobile = isMobile(variant)

    return (
        <div className={cn("grid", mobile ? "min-w-0 grid-cols-2 gap-2" : "mt-4 gap-3")}>
            <BrutalButton
                asChild
                tone="mint"
                className={cn(mobile ? "min-w-0 justify-center px-2 text-xs" : "w-full")}
            >
                <Link to="/login" data-testid={mobile ? undefined : testIds.event.rsvpLoginLink}>
                    {mobile ? "Log in" : "Log in to join"}
                </Link>
            </BrutalButton>
            <BrutalButton
                asChild
                tone="cream"
                className={cn(mobile ? "min-w-0 justify-center px-2 text-xs" : "w-full")}
            >
                <Link to="/register">
                    {mobile ? "Sign up" : "Create an account"}
                </Link>
            </BrutalButton>
        </div>
    )
}

// Shows the current attendance state below RSVP controls.
function AttendanceStatusLine() {
    const { selectedStatus } = useEventRsvpCardContext()

    if (selectedStatus === "confirmed") {
        return (
            <p className="w-full text-center text-sm font-black text-foreground/75">
                You're attending the event
            </p>
        )
    }

    return null
}

// Composes the RSVP controls for desktop and mobile surfaces.
function RsvpActions({ variant = defaultResponsiveVariant }: Readonly<RsvpActionsProps>) {
    const {
        loggedIn,
        selectedStatus,
        submittingStatus,
        onRsvp,
    } = useEventRsvpCardContext()
    const mobile = isMobile(variant)
    const [guestDialogOpen, setGuestDialogOpen] = useState(false)

    function handleMobileRsvpSelect(status: EventRsvpStatus) {
        if (status === "confirmed") {
            setGuestDialogOpen(true)
            return
        }

        onRsvp(status)
    }

    if (mobile) {
        if (!loggedIn) {
            return <AuthActionLinks variant={responsiveVariants.mobile} />
        }

        return (
            <>
                <RsvpChoiceButtons
                    selectedStatus={selectedStatus}
                    submittingStatus={submittingStatus}
                    disabled={submittingStatus !== null}
                    onSelect={handleMobileRsvpSelect}
                    className="grid min-w-0 grid-cols-2 gap-2"
                    buttonClassName="h-12 px-2"
                />
                <MobileGuestRsvpDialog
                    open={guestDialogOpen}
                    onOpenChange={setGuestDialogOpen}
                />
            </>
        )
    }

    return (
        <>
            <div className={cn("space-y-4", !loggedIn && "pointer-events-none opacity-70")}>
                <RsvpChoiceButtons
                    selectedStatus={selectedStatus}
                    submittingStatus={submittingStatus}
                    disabled={loggedIn ? submittingStatus !== null : true}
                    onSelect={onRsvp}
                    className="grid grid-cols-2 gap-3"
                />

                {loggedIn ? (
                    <>
                        <GuestStepper />
                        <AttendanceStatusLine />
                    </>
                ) : null}
            </div>

            {loggedIn ? null : <AuthActionLinks />}
        </>
    )
}

// Wraps desktop RSVP controls in the bordered participation section.
function ParticipationPanel() {
    return (
        <div className="relative mt-6 overflow-hidden border-y-[3px] border-border py-4">
            <RsvpActions />
        </div>
    )
}

// Renders the RSVP shell as either the desktop card or mobile sticky panel.
function RsvpPanel({
    variant = defaultResponsiveVariant,
    children,
    titlebarLabel,
    className,
    ...props
}: Readonly<RsvpPanelProps>) {
    if (isMobile(variant)) {
        return (
            <div
                data-testid={testIds.event.mobileRsvpPanel}
                className={cn(
                    "fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-border bg-event-surface px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_0_0_hsl(var(--border))] lg:hidden",
                    className,
                )}
            >
                {children ?? (
                    <div className="mx-auto flex max-w-7xl items-center gap-3">
                        <PriceCapacitySummary variant={responsiveVariants.mobile} />
                        <div className="min-w-0 flex-1">
                            <RsvpActions variant={responsiveVariants.mobile} />
                        </div>
                    </div>
                )}
            </div>
        )
    }

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
            <div className="p-5 md:p-6">
                {children ?? (
                    <>
                        <PriceCapacitySummary />
                        <ParticipationPanel />
                    </>
                )}
            </div>
        </WindowCard>
    )
}

// Public mobile RSVP panel wrapper that can provide its own RSVP state.
export function EventRsvpMobilePanel({ event, className }: Readonly<EventRsvpMobilePanelProps>) {
    const content = <RsvpPanel variant={responsiveVariants.mobile} className={className} />

    if (event) {
        return <EventRsvpProvider event={event}>{content}</EventRsvpProvider>
    }

    return content
}

// Public desktop RSVP card wrapper that can provide its own RSVP state.
function EventRsvpCardRoot({
    event,
    children,
    titlebarLabel = "JOIN THIS EVENT",
    className,
    ...props
}: Readonly<EventRsvpCardProps>) {
    const content = (
        <RsvpPanel
            titlebarLabel={titlebarLabel}
            className={className}
            {...props}
        >
            {children}
        </RsvpPanel>
    )

    if (event) {
        return <EventRsvpProvider event={event}>{content}</EventRsvpProvider>
    }

    return content
}

const EventRsvpCard = Object.assign(EventRsvpCardRoot, {
    Provider: EventRsvpProvider,
    MobilePanel: EventRsvpMobilePanel,
    PriceCapacity: PriceCapacitySummary,
    Actions: RsvpActions,
    Panel: RsvpPanel,
    Participation: ParticipationPanel,
    GuestStepper,
    AttendanceStatusLine,
    AuthActions: AuthActionLinks,
})

export default EventRsvpCard
