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
const ChangePasswordForm = lazy(() => import("@/components/forms/ChangePasswordForm"))
const EditProfileForm = lazy(() => import("@/components/forms/EditProfileForm"))


function EditProfileDialog() {
    return (<Dialog>
        <DialogTrigger>
            <div className="flex flex-row text-sm items-center gap-1">
                <MdOutlineEditNote /><span>Edit profile</span>
            </div>
        </DialogTrigger>
        <DialogContent className="px-4">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 md:flex-row justify-between">
                <EditProfileForm />
                <ChangePasswordForm className="row-span-2 order-4 md:order-none" />
                <ResponsiveComponent isMobile={true} isTablet={true}><Separator className="my-2 order-3" /></ResponsiveComponent>
            </div>
        </DialogContent>
    </Dialog>)
}

export default EditProfileDialog
