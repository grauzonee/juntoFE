import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"
import Event from "@/components/Event"
import { Calendar } from "@/components/ui/calendar"
import EventFilters from "@/components/EventFilters"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function Events() {
    return (
        <>
            <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                <Button type="button" variant="secondary" className="mb-3 md:mb-0">Show on map</Button>
                <ResponsiveComponent isTablet={true} isMobile={true}>
                    <Separator className="my-4" />
                </ResponsiveComponent>
                <EventFilters className="mb-3 w-1/2" />
            </div>
            <ResponsiveComponent isDesktop={true}>
                <Separator className="my-4" />
            </ResponsiveComponent>
            <div className="h-full flex flex-row w-full gap-5">
                <ResponsiveComponent isDesktop={true}>
                    <Calendar className="rounded-lg w-1/4" />
                </ResponsiveComponent>
                <div className="flex flex-col text-center flex-1 gap-3">
                    <Card className="p-3 backdrop-blur-lg shadow-lg md:shadow border-white/20 flex flex-col md:flex-row gap-3 justify-between items-center cursor-pointer">
                        <Event />
                    </Card>
                    <Card className="p-3 backdrop-blur-lg shadow-lg md:shadow border-white/20 flex flex-col md:flex-row gap-3 justify-between items-center cursor-pointer">
                        <Event />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Events
