import { lazy } from "react"
const Map = lazy(() => import("@/components/Map"))
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function GroupInfoSidebar() {
    return (
        <div className="flex flex-col w-full gap-3">
            <Card variant='ghost'>
                <CardHeader className="flex flex-row w-full gap-2 items-center">

                    <div className='text-left'>
                        <CardTitle>Description</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </div>
                </CardHeader>
                <Separator className="my-3" />
                <CardFooter><p className="text-xs">Member since: 100 days</p></CardFooter>
            </Card>
            <Card variant='ghost'>
                <CardHeader>
                    <div className='text-left'>
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </div>
                </CardHeader>
                <Separator className="my-3" />
                <CardContent>
                    <Map coordinates={[{ lat: 51, lng: 100 }]} />
                </CardContent>
            </Card>
        </div>
    )
}
export default GroupInfoSidebar
