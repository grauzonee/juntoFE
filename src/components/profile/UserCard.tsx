import React, { useContext, lazy, createContext, useMemo, type PropsWithChildren } from "react"
import { type User } from "@/types/User"
const ChangeImageContainer = lazy(() => import("@/components/profile/ChangeImageContainer"))
import { updateUser } from "@/helpers/user";
import { uploadMedia } from "@/helpers/media";
import { Link } from "react-router"
import EditProfileDialog from "@/components/dialogs/EditProfileDialog"
import { cn } from "@/lib/utils"
import PillBadge from "@/components/ui/pill-badge"

const avatar_placeholder = new URL("../../../public/avatar-placeholder.png", import.meta.url).href

type UserCardContext = {
    user: User;
}

const interestTones = [
    "violet",
    "mint",
    "yellow",
] as const

const UserCardContext = createContext<UserCardContext | undefined>(undefined)

type UserCardProps = PropsWithChildren & React.ComponentProps<'div'> & {
    user: User;
}

async function updateProfileImage(file?: File) {
    if (!file) {
        return
    }

    const avatarUrl = await uploadMedia(file)
    await updateUser({ avatarUrl })
}

function useUserCardContext() {
    const context = useContext(UserCardContext)
    if (!context) {
        throw new Error('useUserCardContext must be within an UserCard')
    }
    return context
}

function UserCard({ user, className, children }: UserCardProps) {
    const contextValue = useMemo(() => ({ user }), [user])

    return (
        <UserCardContext.Provider value={contextValue}>
            <div className={className}>
                {children}
            </div>
        </UserCardContext.Provider>
    )
}

UserCard.Image = function UserCardImage() {
    const { user } = useUserCardContext()
    return (
        <Link to="/profile">
            <img className="block aspect-square w-full border-2 border-border object-cover shadow-brutal" src={user?.avatarUrl ?? avatar_placeholder} alt="user avatar" />
        </Link>

    )
}
UserCard.EditableImage = function UserCardEditableImage() {
    const { user } = useUserCardContext()

    return (
        <ChangeImageContainer src={user?.avatarUrl ?? avatar_placeholder} onChange={updateProfileImage} aspect={1} />

    )
}
UserCard.EditProfile = function UserCardEditProfile({ className }: React.ComponentProps<'button'>) {
    return (
        <EditProfileDialog className={className} />

    )
}
UserCard.Name = function UserCardName({ className }: React.ComponentProps<'div'>) {
    const { user } = useUserCardContext()
    return (
        <p className={cn("font-display text-[clamp(2.75rem,7vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.07em]", className)}>{user?.username}</p>

    )
}
UserCard.Description = function UserCardDescription({ className }: React.ComponentProps<'div'>) {
    const { user } = useUserCardContext()
    const classes = user?.description ? className : cn(className, 'text-date')
    return (
        <p className={classes}>{user?.description ?? 'No description yet'}</p>
    )
}
UserCard.Email = function UserCardEmail({ className }: React.ComponentProps<'div'>) {
    const { user } = useUserCardContext()
    return (
        <p className={cn("break-all font-heading text-lg font-bold leading-tight text-violet md:text-xl", className)}>{user?.email}</p>
    )
}
UserCard.Interests = function UserCardInterests() {
    const { user } = useUserCardContext()
    return (
        <div className="flex flex-col gap-3">
            {user?.interests.length == 0 && (
                <small className="border-2 border-dashed border-border bg-card px-4 py-3 text-sm text-foreground/60 shadow-brutal-sm">No interests set</small>
            )}
            {user?.interests.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {user?.interests.map((interest: string, index: number) => (
                        <PillBadge
                            key={interest}
                            tone={interestTones[index % interestTones.length]}
                            className="px-4 py-2 text-xs"
                        >
                            {interest}
                        </PillBadge>
                    ))}
                </div>
            )}

        </div>

    )
}
UserCard.MemberSince = function UserCardMemberSince({ className }: React.ComponentProps<'div'>) {
    const { user } = useUserCardContext()
    const joinedLabel = formatMemberSince(user.createdAt)

    return (
        <p className={cn("font-base text-sm font-medium text-foreground/55 md:text-base", className)}>Member since {joinedLabel}</p>

    )
}

export default UserCard

function formatMemberSince(createdAt: Date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(createdAt))
}
