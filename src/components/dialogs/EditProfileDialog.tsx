import { lazy, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { MdOutlineEditNote } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import ResponsiveComponent from "@/components/helpers/ResponsiveComponent";
const TagsInput = lazy(() => import("@/components/TagsInput"))
const ChangePassword = lazy(() => import("@/components/ChangePassword"))

function EditProfileDialog() {
    const [tags, setTags] = useState(['drawing'])

    const onTagAdd = (newTag: string): void => {
        if (!tags.includes(newTag)) {
            setTags([...tags, newTag])
        }
    }
    const onTagRemove = (tagToRemove: string): void => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
    }
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
                <div className="flex flex-col gap-2 order-1 md:order-none">
                    <div>
                        <Label>Username:</Label>
                        <Input defaultValue="Grauzone" />
                    </div>
                    <div>
                        <Label>Email:</Label>
                        <Input defaultValue="Trake1524@gmail.com" />
                    </div>
                    <div>
                        <Label>Interests:</Label>
                        <TagsInput tags={tags} onTagAdd={onTagAdd} onTagRemove={onTagRemove} />
                    </div>
                </div>
                <ChangePassword className="row-span-2 order-4 md:order-none" />
                <DialogFooter className="items-start order-2 md:order-none flex flex-row gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
                <ResponsiveComponent isMobile={true}><Separator className="my-2 order-3" /></ResponsiveComponent>
            </div>
        </DialogContent>
    </Dialog>)
}

export default EditProfileDialog
