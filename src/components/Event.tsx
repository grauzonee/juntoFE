import { Link } from "react-router"
import {
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import event_example from "/event_example.jpg"
import { Badge } from "@/components/ui/badge"

type EventProps =
    {
        variant?: "full" | "short" | "medium"
    }

function Event({ variant = 'full' }: EventProps) {
    if (variant === "full") {
        return (
            <>
                <div className="flex flex-col flex-1 items">
                    <CardHeader className="items-start text-left">


                    </CardHeader>
                    <CardFooter className="px-3 py-1 bg-accent text-white font-semibold rounded-sm">
                        <p>Mon, Sep 1 · 12:50 PM GMT+2</p>
                    </CardFooter>
                </div>
            </>
        )
    } else {

        return (
            <div className="flex flex-col gap-3 justify-between items-center cursor-pointer">
                {variant == 'medium' && <img src={event_example} alt="Event" className="object-cover" />}

                <div className="flex flex-col flex-1 items">
                    <div className="items-start text-left p-5">
                        <Link to="/event">
                            <p className="text-md font-semibold">September challenge: 3-Hour Art Focus Inspired by book: Four Thousand Weeks</p>
                        </Link>
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xs text-gray-700">NoCrastination Club • Vienna, AT • 4.9</p>
                            <Badge variant="outline">12.09.2024</Badge>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default Event
