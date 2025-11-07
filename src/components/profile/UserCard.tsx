import React, { useContext, lazy, createContext, type PropsWithChildren } from "react"
import { type User } from "@/types/User"
import { Card } from "@/components/ui/card"
const ChangeImageContainer = lazy(() => import("@/components/profile/ChangeImageContainer"))
import avatar_placeholder from '/avatar-placeholder.png'
import { updateUser } from "@/helpers/user";
import { uploadMedia } from "@/helpers/media";
import { Link } from "react-router"
import EditProfileDialog from "@/components/dialogs/EditProfileDialog"
import { Badge } from "@/components/ui/badge"
import { type VariantProps } from "class-variance-authority"
import { cardVariants } from "@/components/ui/card"

type UserCardContext = {
    user: User;
}

const UserCardContext = createContext<UserCardContext | undefined>(undefined)

type UserCardProps = PropsWithChildren & React.ComponentProps<'div'> & VariantProps<typeof cardVariants> & {
    user: User;
}
function useUserCardContext() {
    const context = useContext(UserCardContext)
    if (!context) {
        throw new Error('useUserCardContext must be within an UserCard')
    }
    return context
}

function UserCard({ user, className, children, variant = 'default' }: UserCardProps) {
    return (
        <Card className={className} variant={variant}>
            <UserCardContext.Provider value={{ user }}>
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
    async function onImageChange(file?: File) {
        if (file) {
            const avatarUrl = await uploadMedia(file);
            await updateUser({ avatarUrl })
            // TODO: Dispatch event
            //refreshUser()
        }
    }

    return (
        <ChangeImageContainer src={user?.avatarUrl ?? avatar_placeholder} onChange={onImageChange} aspect={3 / 4} />

    )
}
UserCard.EditProfile = function UserCardEditProfile() {
    return (
        <EditProfileDialog />

    )
}
UserCard.Name = function UserCardName() {
    const { user } = useUserCardContext()
    return (
        <p className="font-bold block">{user?.username}</p>

    )
}
UserCard.Description = function UserCardDescription() {
    const { user } = useUserCardContext()
    return (
        <p>{user?.description}</p>
    )
}
UserCard.Email = function UserCardEmail() {
    const { user } = useUserCardContext()
    return (
        <p>{user?.email}</p>

    )
}
UserCard.Interests = function UserCardInterests() {
    const { user } = useUserCardContext()
    return (
        <div className="flex flex-row flex-wrap">
            {user?.interests && user?.interests.length > 0 && <span className="font-bold">Interests:</span>}

            {user?.interests.map((interest: string, index: number) => (
                <Badge variant="secondary" key={index}>{interest}</Badge>
            ))}
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
