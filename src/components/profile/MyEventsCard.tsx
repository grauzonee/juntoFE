import { lazy } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import EventCard from "../event/EventCard"
const CreateEventDialog = lazy(() => import("@/components/dialogs/CreateEventDialog"))
import { event } from "@/data"

function MyEventsCard() {
    return (
        <Card className="pb-3">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Events I've organized:</CardTitle>
                <CreateEventDialog />
            </CardHeader>
            <Carousel className="w-2/3 md:w-5/6 mx-auto">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-[2/3] md:aspect-[7/3] items-center justify-center p-6 flex-col">
                                        <EventCard event={event} className="flex flex-col gap-3">
                                            <EventCard.Image />
                                            <div>
                                                <EventCard.Title />
                                                <EventCard.Address />
                                                <EventCard.Date />
                                            </div>
                                        </EventCard>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </Card>
    )
}

export default MyEventsCard
