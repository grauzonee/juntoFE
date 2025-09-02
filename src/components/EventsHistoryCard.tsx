import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import Event from "@/components//Event"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function EventsHistoryCard({ className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className={cn(className, 'flex flex-col justify-between')}>
            <CardHeader>
                <CardTitle>Events history:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
                <Event variant="short" />
                <Event variant="short" />
                <Event variant="short" />
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

export default EventsHistoryCard
