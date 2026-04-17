import WindowCard from "@/components/landing/WindowCard"
import EventSectionHeading from "@/components/event/EventSectionHeading"
import { testIds } from "@/testIds"

export default function EventDiscussionSection() {
    return (
        <WindowCard
            data-testid={testIds.event.discussionSection}
            className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
        >
            <div className="p-5 md:p-7">
                <EventSectionHeading label="Discussion" />
                <div className="border-2 border-border bg-mint-light px-5 py-6 text-center shadow-brutal-sm">
                    <p className="text-base leading-7 text-foreground/80">
                        Discussion is not connected in the frontend yet. For now, use the event details and host
                        information to coordinate your plans.
                    </p>
                </div>
            </div>
        </WindowCard>
    )
}
