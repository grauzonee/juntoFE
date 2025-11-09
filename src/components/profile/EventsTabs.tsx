import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import EventsListCard from "@/components/EventsListCard"

function EventsTabs() {
    return (
        <Tabs defaultValue="incomingEvents">
            <TabsList className="w-full justify-evenly flex-col md:flex-row h-fit">
                <TabsTrigger value="incomingEvents">Incoming events</TabsTrigger>
                <TabsTrigger value="pastEvents">Past events</TabsTrigger>
                <TabsTrigger value="organizedEvents">Organized events</TabsTrigger>
            </TabsList>
            <TabsContent value="incomingEvents">
                <EventsListCard title="Incoming events:" />
            </TabsContent>
            <TabsContent value="pastEvents">
                <EventsListCard title="Events history:" />
            </TabsContent>
            <TabsContent value="organizedEvents">
                <EventsListCard title="Events I've organized:" />
            </TabsContent>
        </Tabs>
    )
}

export default EventsTabs
