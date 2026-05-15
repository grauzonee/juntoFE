import UserCard from "@/components/profile/UserCard"
import { UserContext } from "@/contexts/UserContext"
import { useContext } from "react"
import { Card } from "@/components/ui/card"
import { AttendingEventsSection, MyEventsSection } from "@/components/profile/EventsTabs"

function User() {
    const { user } = useContext(UserContext)
    return (
        <div className="w-full bg-transparent md:overflow-hidden md:border-2 md:border-border md:bg-cream md:shadow-brutal-lg">
            <div className="px-2 py-5 md:px-6 md:py-8">
                {user ? (
                    <UserCard user={user} className="space-y-8">
                        <section className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start">
                            <div className="space-y-4">
                                <UserCard.EditableImage />
                                <UserCard.EditProfile className="w-full justify-center" />
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <UserCard.Name />
                                    <UserCard.MemberSince className="pt-1" />
                                </div>

                                <div className="space-y-4">
                                    <ProfileDetail label="Email">
                                        <UserCard.Email />
                                    </ProfileDetail>
                                    <ProfileDetail label="Interests">
                                        <UserCard.Interests />
                                    </ProfileDetail>
                                </div>
                            </div>
                        </section>

                        <AttendingEventsSection />

                        <MyEventsSection />
                    </UserCard>
                ) : (
                    <Card className="border-2 border-dashed border-border bg-card px-6 py-10 text-center shadow-brutal-sm">
                        <h2 className="font-display text-4xl font-extrabold tracking-[-0.05em]">
                            Your profile is loading.
                        </h2>
                        <p className="mt-3 text-base leading-7 text-foreground/70">
                            Refresh the page if your account details do not appear in a moment.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default User

function ProfileDetail({
    label,
    children,
}: Readonly<{
    label: string
    children: React.ReactNode
}>) {
    return (
        <div className="space-y-2">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/48">
                {label}
            </p>
            <div>{children}</div>
        </div>
    )
}
