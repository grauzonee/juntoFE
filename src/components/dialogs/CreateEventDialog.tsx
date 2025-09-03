import { useState, lazy } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
const ChangeImageContainer = lazy(() => import("@/components/ChangeImageContainer"));
import DatePicker from "@/components/DatePicker";
const TagsInput = lazy(() => import("@/components/TagsInput"));

function CreateEventDialog() {
    const [topics, setTopics] = useState<string[]>([])
    const onAddTopic = (newTag: string): void => {
        if (!topics.includes(newTag)) {
            setTopics([...topics, newTag])
        }
    }
    const onTopicRemove = (tagToRemove: string): void => {
        setTopics((prevTopics) => prevTopics.filter((topic) => topic !== tagToRemove))
    }

    const firstStep = (<>
        <div className="flex flex-col gap-2">
            <div>
                <Label>Title:</Label>
                <Input />
            </div>
            <div>
                <Label>Description:</Label>
                <Textarea />
            </div>
            <div>
                <Label>Date</Label>
                <DatePicker />
            </div>
            <div>
                <Label>Topic</Label>
                <TagsInput tags={topics} onTagAdd={onAddTopic} onTagRemove={onTopicRemove} />
            </div>
        </div>
        <ChangeImageContainer />

    </>)
    return (

        <Dialog>
            <DialogTrigger>
                <div className="flex flex-row text-sm items-center gap-1">
                    <Plus className="bg-white rounded-full cursor-pointer" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add event</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col md:grid gap-6 md:gap-x-12 md:grid-rows-[auto_2rem] md:grid-cols-[15rem_15rem]">
                    {firstStep}
                    <DialogFooter className="items-start flex flex-row gap-2 col-start-2">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Next</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEventDialog
