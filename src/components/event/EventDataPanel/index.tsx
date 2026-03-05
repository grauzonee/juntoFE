import EventCard from "@/components/event/EventDataPanel/EventCard"
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"
import { createEventResource } from "@/requests/event"
import { use } from 'react';

type EventDataPanelProps = {
    id: string
}

const EventDataPanel: React.FC<EventDataPanelProps> = ({ id }) => {
    const event = use(createEventResource(id));
    if (!event) {
        throw new Error("NOT_FOUND");
    }
    return (
        <EventCard event={event} className="w-full flex flex-col gap-5 px-3">
            <div className="flex flex-col lg:flex-row gap-3 h-fit lg:order-1 order-2">
                <ResponsiveComponent isDesktop={true}>
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <EventCard.Image />
                    </div>
                </ResponsiveComponent>
                <div className="lg:w-1/2 w-full relative flex flex-col md:flex-row justify-between">
                    <div className="w-full lg:w-2/3 flex flex-col justify-start gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row w-full justify-between">
                                <EventCard.Title className="text-h2" isLink={false} />
                                <EventCard.Type />
                            </div>

                            <ResponsiveComponent isTablet={true} isMobile={true}>
                                <EventCard.Image />
                            </ResponsiveComponent>
                            <EventCard.Categories />

                        </div>
                        <div>
                            <small className="text-label">Organizer</small>
                            <div className="flex flex-row items-center gap-2">
                                <EventCard.OrganizerAvatar />
                                <EventCard.OrganizerName />
                            </div>
                        </div>
                        <div>
                            <EventCard.Time />
                            <EventCard.Address />
                        </div>
                        <div>
                            <small className="text-label">Participants</small>
                            <div className="flex flex-row items-center">
                                <EventCard.Participants />
                                <EventCard.Buttons className="z-40 fixed bottom-0 left-0 right-0 bg-background flex flex-row justify-center py-3 lg:items-end border-2 border-border lg:relative lg:bg-transparent lg:h-full lg:border-none" />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <EventCard.Description className="order-3" />
        </EventCard >
    )
}

export default EventDataPanel