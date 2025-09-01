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
        <Card className="p-3 backdrop-blur-lg shadow-lg md:shadow border-white/20 flex flex-col md:flex-row gap-3 justify-between items-center cursor-pointer">
            <div className="rounded-lg md:max-h-18 md:w-40 w-full overflow-hidden shadow">
                <img src={event_example} alt="Event" className="object-cover" />
            </div>
            <div className="flex flex-col flex-1 items">
                <CardHeader className="items-start text-left">
                    <CardTitle>September challenge: 3-Hour Art Focus Inspired by book: Four Thousand Weeks</CardTitle>
                    <CardDescription>NoCrastination Club • Vienna, AT • 4.9</CardDescription>
                </CardHeader>
                <CardFooter className="px-3 py-1 bg-accent text-white shadow font-semibold rounded-sm">
                    <p>Mon, Sep 1 · 12:50 PM GMT+2</p>
                </CardFooter>
            </div>
        </Card>
    )
}

export default Event
