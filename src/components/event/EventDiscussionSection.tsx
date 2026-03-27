import WindowCard from "@/components/landing/WindowCard"
import EventSectionHeading from "@/components/event/EventSectionHeading"

export default function EventDiscussionSection() {
    return (
        <WindowCard className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500">
            <div className="p-5 md:p-7">
                <EventSectionHeading label="Discussion" />
                <div className="border-[3px] border-border bg-mint-light px-5 py-6 text-center shadow-[4px_4px_0_0_hsl(var(--border))]">
                    <p className="text-base leading-7 text-foreground/80">
                        Discussion is not connected in the frontend yet. For now, use the event details and host
                        information to coordinate your plans.
                    </p>
                </div>
            </div>
        </WindowCard>
    )
}
