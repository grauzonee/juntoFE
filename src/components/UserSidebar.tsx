import { lazy, useEffect, useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
const Badge = lazy(() => import("@/components/ui/badge").then(m => ({ default: m.Badge })));
const EditProfileDialog = lazy(() => import("@/components/dialogs/EditProfileDialog"))
import { Separator } from "@/components/ui/separator"
const ChangeImageContainer = lazy(() => import("@/components/ChangeImageContainer"))
import avatar_placeholder from '/avatar-placeholder.png'
import { getUser } from "@/helpers/user";
import type { User } from "@/types/User";

function UserSidebar() {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        getUser().then((response) => {
            setUser(response)
        })
    }, [])
    function onImageChange(file?: File) {
        console.log(file)
    }
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
        <>
            {user && user.id && <Card className="py-3 h-fit">
                <CardContent>
                    <ChangeImageContainer src={user.avatarUrl ?? avatar_placeholder} onChange={onImageChange} />
                    <Separator className="my-2" />
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xl font-bold block">{user.username}</p>
                            <EditProfileDialog />
                        </div>
                        <p>{user.email}</p>
                        <div className="flex flex-col gap-1">
                            {user.interests.length > 0 && <span className="font-bold">Interests:</span>}
                            <div className="flex flex-row flex-wrap">
                                {user.interests.map((interest: string, index: number) => (
                                    <Badge variant="secondary" key={index}>{interest}</Badge>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-gray-700">Member since: {getMemberSince()}</p>
                    </div>
                </CardContent>
            </Card>
            }
        </>
    )
}

export default UserSidebar
