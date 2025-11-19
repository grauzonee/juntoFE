import { lazy, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Settings2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent";
import { Button } from "@/components/ui/button";
const ChangePasswordForm = lazy(() => import("@/components/forms/ChangePasswordForm"))
const EditProfileForm = lazy(() => import("@/components/forms/EditProfileForm"))


function EditProfileDialog() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="accent" title="Edit profile"><Settings2 /></Button>
            </DialogTrigger>
            <DialogContent className="px-4">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5 lg:flex-row justify-between">
                    <EditProfileForm onSubmit={() => setOpen(false)} />
                    <ChangePasswordForm className="row-span-2 order-4 md:order-none" />
                    <ResponsiveComponent isMobile={true} isTablet={true}><Separator className="my-2 order-3" /></ResponsiveComponent>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog
