import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';
import CreateEventForm from "../forms/CreateEventForm";

function CreateEventDialog() {
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
                <CreateEventForm />
            </DialogContent>
        </Dialog>
    )
}

export default CreateEventDialog
