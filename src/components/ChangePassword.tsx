import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function ChangePassword({ className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(className, 'flex flex-col gap-2')} >
            <div>
                <Label>Current password:</Label>
                <Input type="password" />
            </div>
            <div>
                <Label>New password:</Label>
                <Input type="password" />
            </div>
            <Button type="submit" onClick={() =>
                toast("Verification has been sent", {
                    description: "Check your mailbox",
                })}>Save password</Button>
        </ div>
    )
}
export default ChangePassword
