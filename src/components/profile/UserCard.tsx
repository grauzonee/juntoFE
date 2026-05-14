import React, { useContext, lazy, createContext, useMemo, type PropsWithChildren } from "react"
import { type User } from "@/types/User"
import { Card } from "@/components/ui/card"
const ChangeImageContainer = lazy(() => import("@/components/profile/ChangeImageContainer"))
import { updateUser } from "@/helpers/user";
import { uploadMedia } from "@/helpers/media";
import { Link } from "react-router"
import EditProfileDialog from "@/components/dialogs/EditProfileDialog"
import { Badge } from "@/components/ui/badge"
import { type VariantProps } from "class-variance-authority"
import { cardVariants } from "@/components/ui/card-variants"
import { cn } from "@/lib/utils"

const avatar_placeholder = new URL("../../../public/avatar-placeholder.png", import.meta.url).href

type UserCardContext = {
    user: User;
}

const UserCardContext = createContext<UserCardContext | undefined>(undefined)

type UserCardProps = PropsWithChildren & React.ComponentProps<'div'> & VariantProps<typeof cardVariants> & {
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

function UserCard({ user, className, children, variant = 'default' }: UserCardProps) {
    const contextValue = useMemo(() => ({ user }), [user])

    return (
        <Card className={className} variant={variant}>
            <UserCardContext.Provider value={contextValue}>
                {children}
            </UserCardContext.Provider>
        </Card>
    )
}

UserCard.Image = function UserCardImage() {
    const { user } = useUserCardContext()
    return (
        <Link to="/profile">
            <img className="mask block mask-circle size-20" src={user?.avatarUrl ?? avatar_placeholder} alt="user avatar" />
        </Link>

    )
}
UserCard.EditableImage = function UserCardEditableImage() {
    const { user } = useUserCardContext()

    return (
        <ChangeImageContainer src={user?.avatarUrl ?? avatar_placeholder} onChange={updateProfileImage} aspect={3 / 4} />

    )
}
UserCard.EditProfile = function UserCardEditProfile() {
    return (
        <EditProfileDialog />

    )
}
UserCard.Name = function UserCardName({ className }: React.ComponentProps<'div'>) {
    const { user } = useUserCardContext()
    return (
        <p className={cn("font-bold block", className)}>{user?.username}</p>

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
        <p className={className}>{user?.email}</p>
    )
}
UserCard.Interests = function UserCardInterests() {
    const { user } = useUserCardContext()
    return (
        <div className="flex flex-col gap-2 flex-wrap">
            {user?.interests.length == 0 && (
                <small className="text-date">No interests set</small>
            )}
            {user?.interests.length > 0 && (
                <div className="flex flex-row">
                    {user?.interests.map((interest: string) => (
                        <Badge variant="secondary" key={interest}>{interest}</Badge>
                    ))}
                </div>
            )}

        </div>

    )
}
UserCard.MemberSince = function UserCardMemberSince() {
    const { user } = useUserCardContext()
    function getMemberSince() {
        if (!user) {
            return 0;
        }
        const createdDate = new Date(user.createdAt);
        const now = new Date();
        const diffMs = now.getTime() - createdDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays == 0) {
            return "today"
        }
        if (diffDays == 1) {
            return "yesterday"
        }
        return String(diffDays) + ' days';
    }

    return (
        <p className="text-xs text-gray-700">Member since: {getMemberSince()}</p>

    )
}

export default UserCard
