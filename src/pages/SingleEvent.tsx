import {
    Card,
} from "@/components/ui/card"
import AttendiesCarousel from "@/components/AttendiesCarousel"
import EventCard from "@/components/cards/EventCard"

function SingleEvent() {
    const event = {
        id: '123',
        title: 'Drawing club',
        description: 'This is a non-profit international life drawing group for everyone interested in learning or brushing up on drawing! Since 2015 we have met weekly in the very center of Vienna. We are almost a big artistic family now. :)',
        locationValue: 'Pickwick’s, Marc Aurel street, 10-12, 1010',
        location: {
            longitude: 123.567,
            latitude: 43.562
        },
        date: 1767083631,
        imageUrl: 'http://localhost:3000/uploads/1761818188823-The_Drawing_Club_-_2.jpg',
        topics: ['drawing', 'painting', 'learning']
    }
    return (
        <>
            <Card className="w-full flex flex-col md:flex-row md:gap-5 bg-main p-3">
                <div className="md:flex-1 flex flex-col gap-3">
                    <EventCard event={event} className="p-5">
                        <div className="flex flex-row w-100 gap-5">
                            <div className="w-1/2 flex flex-col gap-3">
                                <EventCard.Title />
                                <EventCard.Image />
                            </div>
                            <div className="w-1/3">
                                <EventCard.Buttons />
                            </div>
                        </div>
                        <EventCard.Description />
                    </EventCard>
                    <AttendiesCarousel />
                </div>
            </Card >
        </>
    )
}

export default SingleEvent
