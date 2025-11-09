import UserCard from "@/components/profile/UserCard"
import { UserContext } from "@/contexts/UserContext"
import { useContext } from "react"
import { Card } from "@/components/ui/card"
import EventsTabs from "@/components/profile/EventsTabs"
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"

function User() {
    const { user } = useContext(UserContext)
    return (
        <Card className="w-full flex flex-col md:gap-5 md:bg-main md:p-3 p-0 border-0 shadow-0 md:shadow-shadow md:border-border md:border-2 bg-transparent">
            <div className="w-full h-full py-2">
                <div className="flex flex-col lg:flex-row gap-3 mb-2 items-stretch w-full">
                    {user && <UserCard user={user} className="flex flex-col md:flex-row lg:flex-col lg:shrink-0 lg:basis-1/3 gap-5 p-5 h-fit">
                        <UserCard.EditableImage />
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row lg:flex-row md:flex-col w-100 justify-between items-center">
                                <UserCard.Name className="text-h3" />
                                <UserCard.EditProfile />
                            </div>
                            <UserCard.Email className="text-sm" />
                            <div>
                                <small className="text-label">Description:</small>
                                <UserCard.Description className="text-sm" />
                            </div>
                            <div>
                                <small className="text-label">Interests:</small>
                                <UserCard.Interests />
                            </div>
                            <UserCard.MemberSince />
                        </div>
                    </UserCard>}
                    <ResponsiveComponent isDesktop={true} isTablet={true}>
                        <EventsTabs />
                    </ResponsiveComponent>
                    <ResponsiveComponent isMobile={true}>
                        <EventsTabs />
                    </ResponsiveComponent>
                </div >
            </div >
        </Card>
    )
}

export default User
