import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import EventCard from "@/components/event/EventCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import { event } from "@/data";

const events = [event, event, event]

type EventsListCardProps = React.ComponentProps<'div'> & {
    title?: string;
}

function EventsListCard({ className, title }: EventsListCardProps) {
    return (
        <Card className={cn(className, 'flex flex-col justify-between')}>
            <CardHeader>
                {title && <CardTitle>
                    <h3>{title}</h3>
                </CardTitle>}
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-1">
                    {events.map((event, index) => (
                        <EventCard event={event} className="flex flex-col md:flex-row gap-3 md:max-h-36 shadow-0 border" key={index}>
                            <EventCard.Image className="md:w-1/3" />
                            <div className="flex flex-col gap-4">
                                <EventCard.Title className="text-h4" />
                                <div className="flex flex-col h-full justify-between">
                                    <EventCard.Address className="text-sm" />
                                    <EventCard.Date className="h-[30px] w-[150px]" />
                                </div>
                            </div>
                        </EventCard>
                    ))}
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>

    )
}

export default EventsListCard
