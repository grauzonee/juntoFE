import Event from "@/components/Event"
import { Card, CardContent } from "@/components/ui/card"

function EventCard() {
    return (

        < Card >
            <CardContent className="flex aspect-square items-center justify-center p-6">
                <Event variant="medium" />
            </CardContent>
        </Card >
    )
}
export default EventCard
