import { type Event } from "@/types/Event"
import EventCard from "@/components/event/EventCard"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ResponsiveComponent from "../helpers/ResponsiveComponent"

type SimilarEventsProps = {
    events: Event[]
}

function SimilarEvents({ events }: SimilarEventsProps) {
    return (
        <>
            <ResponsiveComponent isTablet={true} isDesktop={true}>
                <div className="w-full flex-col items-center gap-4 flex px-12">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {events.map((event, index) => (
                                <CarouselItem key={index} className="md:basis-1/2">
                                    <div className="p-[10px]">
                                        <EventCard event={event}>
                                            <EventCard.Image />
                                            <EventCard.Title />
                                            <EventCard.Address />
                                        </EventCard>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </ResponsiveComponent>
            <ResponsiveComponent isMobile={true}>
                <div className="max-h-[500px] overflow-scroll flex flex-col gap-3">
                    {events.map((event, index) => (
                        <EventCard event={event} className="flex flex-col gap-3" key={index}>
                            <EventCard.Image />
                            <div>
                                <EventCard.Title />
                                <EventCard.Address />
                                <EventCard.Date />
                            </div>
                        </EventCard>
                    ))}
                </div>
            </ResponsiveComponent>
        </>
    )
}

export default SimilarEvents
