import { Card } from "@/components/ui/card"
import EventCard from "@/components/event/EventCard"
import Discussion from "@/components/comment/Discussion"
import { event } from "@/data"
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"
import EventCarousel from "@/components/event/EventCarousel"

function SingleEvent() {

    return (
        <>
            <Card className="w-full flex flex-col md:gap-5 md:bg-main md:p-3 p-0 border-0 shadow-0 md:shadow-shadow md:border-border md:border-2 bg-transparent">
                <EventCard event={event} className="w-full flex flex-col gap-5 px-3">
                    <div className="flex flex-col lg:flex-row gap-3 h-fit lg:order-1 order-2">
                        <ResponsiveComponent isDesktop={true}>
                            <div className="w-full lg:w-1/2 flex flex-col gap-3">
                                <EventCard.Image />
                            </div>
                        </ResponsiveComponent>
                        <div className="lg:w-1/2 w-full relative flex flex-col md:flex-row justify-between">
                            <div className="w-full lg:w-2/3 flex flex-col justify-start gap-4">
                                <div>
                                    <small className="text-label">Organizer</small>
                                    <div className="flex flex-row items-center gap-2">
                                        <EventCard.OrganizerAvatar />
                                        <EventCard.OrganizerName />
                                    </div>
                                </div>
                                <div>
                                    <small className="text-label">Location</small>
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
                            <ResponsiveComponent isTablet={true} isDesktop={true}>
                                <EventCard.Date variant={'box'} className="size-28" />
                            </ResponsiveComponent>
                        </div>
                    </div>
                    <div className="lg:order-2 order-1 flex flex-col gap-3">
                        <EventCard.Title className="text-h2" isLink={false} />
                        <ResponsiveComponent isTablet={true} isMobile={true}>
                            <EventCard.Image />
                        </ResponsiveComponent>
                        <EventCard.Tags />
                    </div>
                    <EventCard.Description className="order-3" />
                </EventCard >

                <Discussion />
                <h3 className="text-foreground">Similar Events</h3>
                <EventCarousel events={[event, event, event, event]} />
            </Card >

        </>
    )
}

export default SingleEvent
