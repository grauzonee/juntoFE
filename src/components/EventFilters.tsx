import ResponsiveComponent from "./helpers/ResponsiveComponent"
import { Funnel } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { type HTMLAttributes } from "react";

function EventFilters({ className }: HTMLAttributes<HTMLDivElement>) {
    const filters = (<>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Distance" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select></>

    )
    return (
        <>
            <ResponsiveComponent isDesktop={true} isTablet={true}>
                <div className={cn('w-full flex flex-row justify-between items-end px-3', className)}>
                    <div className="w-3/4 md:w-1/2 flex flex-row gap-2">
                        {filters}
                    </div>
                    <div>
                        <p className="font-semibold cursor-pointer">Reset filters</p>
                    </div>
                </div>
            </ResponsiveComponent>

            <ResponsiveComponent isMobile={true}>
                <Dialog>
                    <DialogTrigger>
                        <div className="w-[83vw] flex flex-row justify-between">
                            <Funnel className="text-gray-800 hover:text-accent cursor-pointer block" />
                            <div>
                                <p className="font-semibold cursor-pointer">Reset filters</p>
                            </div>
                        </div>

                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select filters</DialogTitle>
                            <DialogDescription>
                                <div className="flex flex-col gap-2">
                                    {filters}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <Button variant="secondary" className="w-1/2 mx-auto">Done</Button>
                    </DialogContent>
                </Dialog>
            </ResponsiveComponent>
        </>
    )
}
export default EventFilters
