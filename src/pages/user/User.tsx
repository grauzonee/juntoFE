import EventsHistoryCard from "@/components/EventsHistoryCard"
import MyEventsCard from "@/components/MyEventsCard"
import UserCard from "@/components/cards/UserCard"

function User() {
    return (
        <div className=" w-full h-full py-2">
            <div className="flex flex-col md:flex-row gap-3 mb-2 items-stretch">
                <UserCard className="flex flex-col gap-2 p-5">
                    <UserCard.EditableImage />
                    <div className="flex flex-row w-100 justify-between">
                        <UserCard.Name />
                        <UserCard.EditProfile />
                    </div>
                    <UserCard.Description />
                    <UserCard.Interests />
                    <UserCard.MemberSince />
                </UserCard>
                <div className="flex-1 flex flex-col gap-3">
                    <EventsHistoryCard className="h-full" />
                </div>
            </div >
            <MyEventsCard />
        </div >
    )
}

export default User
