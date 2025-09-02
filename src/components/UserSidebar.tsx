import { lazy } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
const Badge = lazy(() => import("@/components/ui/badge").then(m => ({ default: m.Badge })));
const EditProfileDialog = lazy(() => import("@/components/dialogs/EditProfileDialog"))
import { Separator } from "@/components/ui/separator"
import ImageContainer from "@/components/ImageContainer"
import avatar_placeholder from '/avatar-placeholder.png'


function UserSidebar() {
    return (
        <Card className="py-3 h-fit">
            <CardContent>
                <ImageContainer src={avatar_placeholder} />
                <Separator className="my-2" />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xl font-bold block">Grauzone</p>
                        <EditProfileDialog />
                    </div>
                    <p>trake1524@gmail.com</p>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">Interests:</span>
                        <div className="flex flex-row flex-wrap">
                            <Badge variant="secondary">Dawing</Badge>
                        </div>
                    </div>
                    <p className="text-xs text-gray-700">Member since: 100days</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserSidebar
