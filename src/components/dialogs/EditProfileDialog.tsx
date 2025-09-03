import { lazy } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MdOutlineEditNote } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent";
const ChangePassword = lazy(() => import("@/components/ChangePassword"))
import EditProfileForm from "@/components/forms/EditProfileForm"


function EditProfileDialog() {
    return (<Dialog>
        <DialogTrigger>
            <div className="flex flex-row text-sm items-center gap-1">
                <MdOutlineEditNote /><span>Edit profile</span>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:grid gap-6 md:gap-x-12 md:grid-rows-[auto_2rem] md:grid-cols-[15rem_15rem]">
                <EditProfileForm />
                <ChangePassword className="row-span-2 order-4 md:order-none" />
                <ResponsiveComponent isMobile={true}><Separator className="my-2 order-3" /></ResponsiveComponent>
            </div>
        </DialogContent>
    </Dialog>)
}

export default EditProfileDialog
