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
import BrutalButton from "@/components/ui/brutal-button";
const ChangePasswordForm = lazy(() => import("@/components/forms/ChangePasswordForm"))
const EditProfileForm = lazy(() => import("@/components/forms/EditProfileForm"))

type EditProfileDialogProps = Readonly<{
    className?: string
}>

function EditProfileDialog({ className }: EditProfileDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <BrutalButton type="button" tone="violet" className={className} title="Edit profile">
                    <span>Edit profile</span>
                    <Settings2 />
                </BrutalButton>
            </DialogTrigger>
            <DialogContent className="max-w-4xl rounded-none border-brutal border-border bg-cream px-5 py-6 shadow-brutal-xl">
                <DialogHeader className="border-b-2 border-border pb-4">
                    <DialogTitle className="font-heading text-2xl font-bold">Edit profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <EditProfileForm onSubmit={() => setOpen(false)} />
                    <ChangePasswordForm className="row-span-2 order-4 md:order-none" />
                    <ResponsiveComponent isMobile={true} isTablet={true}><Separator className="my-2 order-3" /></ResponsiveComponent>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog
