import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import event_example from "/event_example.jpg"

function Event() {
    return (
        <Card className="p-3 backdrop-blur-md border-white/20 flex flex-row gap-3 justify-between items-center">
            <div className="rounded-lg h-18 w-40 overflow-hidden shadow">
                <img src={event_example} alt="Event" className="object-cover" />
            </div>
            <div className="flex flex-col flex-1 items">
                <CardHeader className="items-start text-left">
                    <CardTitle>September challenge: 3-Hour Art Focus Inspired by book: Four Thousand Weeks</CardTitle>
                    <CardDescription>NoCrastination Club • Vienna, AT • 4.9</CardDescription>
                </CardHeader>
                <CardFooter className="px-3 py-1 bg-accent text-white shadow">
                    <p>Mon, Sep 1 · 12:50 PM GMT+2</p>
                </CardFooter>
            </div>
        </Card>
    )
}

export default Event
