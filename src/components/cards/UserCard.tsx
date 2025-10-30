import React, { useContext, lazy } from "react"
import { Card } from "@/components/ui/card"
const ChangeImageContainer = lazy(() => import("@/components/ChangeImageContainer"))
import avatar_placeholder from '/avatar-placeholder.png'
import { updateUser } from "@/helpers/user";
import { uploadMedia } from "@/helpers/media";
import { UserContext } from "@/contexts/UserContext"
import { Link } from "react-router"
import EditProfileDialog from "@/components/dialogs/EditProfileDialog"
import { Badge } from "@/components/ui/badge"


function UserCard({ className, children }: React.ComponentProps<'div'>) {

    return (
        <Card className={className}>
            {children}
        </Card>
    )
}

UserCard.Image = function UserCardImage() {
    const { user } = useContext(UserContext)
    return (
        <Link to="/profile">
            <img className="mask block mask-circle size-20" src={user?.avatarUrl ?? avatar_placeholder} alt="user avatar" />
        </Link>

    )
}
UserCard.EditableImage = function UserCardEditableImage() {
    const { user, refreshUser } = useContext(UserContext)
    async function onImageChange(file?: File) {
        if (file) {
            const avatarUrl = await uploadMedia(file);
            await updateUser({ avatarUrl })
            refreshUser()
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
    const { user } = useContext(UserContext)
    return (
        <p className="text-xl font-bold block">{user?.username}</p>

    )
}
UserCard.Description = function UserCardDescription() {
    const { user } = useContext(UserContext)
    return (
        <p>{user?.description}</p>
    )
}
UserCard.Email = function UserCardEmail() {
    const { user } = useContext(UserContext)
    return (
        <p>{user?.email}</p>

    )
}
UserCard.Interests = function UserCardInterests() {
    const { user } = useContext(UserContext)
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
    const { user } = useContext(UserContext)
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
