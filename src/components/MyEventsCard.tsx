import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { IoMdAdd } from "react-icons/io";

function MyEventsCard() {
    return (
        <Card className="pb-3">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Events I've organized:</CardTitle>
                <IoMdAdd className="bg-white rounded-full cursor-pointer" />
            </CardHeader>
            <Carousel className="w-2/3 md:w-5/6 mx-auto">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-[2/3] md:aspect-[7/3] items-center justify-center p-6">
                                        <span className="text-xl font-semibold">{index + 1}</span>
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
