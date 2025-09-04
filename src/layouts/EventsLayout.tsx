import { Link } from "react-router"
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"
import { Calendar } from "@/components/ui/calendar"
import EventFilters from "@/components/EventFilters"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

type EventsLayoutProps = {
    children: React.ReactNode;
    button: {
        to: string;
        label: string;
    };
};

function EventsLayout({ children, button }: EventsLayoutProps) {
    return (
        <>
            <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                <Link to={button.to}>
                    <Button type="button" variant="secondary" className="mb-3 md:mb-0 w-full">{button.label}</Button>
                </Link>
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
                    <Calendar className="rounded-lg w-1/4 h-fit" />
                </ResponsiveComponent>
                <div className="flex flex-col text-center flex-1 gap-3">
                    {children}
                </div>
            </div>
        </>
    )
}

export default EventsLayout
