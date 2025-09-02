import EventsHistoryCard from "@/components/EventsHistoryCard"
import MyEventsCard from "@/components/MyEventsCard"
import UserSidebar from "@/components/UserSidebar"

function User() {
    return (
        <div className=" w-full h-full py-2">
            <div className="flex flex-col md:flex-row gap-3 mb-2 items-stretch">
                <UserSidebar />
                <div className="flex-1 flex flex-col gap-3">
                    <EventsHistoryCard className="h-full" />
                </div>
            </div>
            <MyEventsCard />
        </div >
    )
}

export default User
