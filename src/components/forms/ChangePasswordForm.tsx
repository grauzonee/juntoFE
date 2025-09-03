import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangePasswordSchema, changePasswordSchema } from "@/schemas/ProfileSchemas";

function ChangePasswordForm({ className }: HTMLAttributes<HTMLDivElement>) {
    const form = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema)
    })

    function onSubmit(values: ChangePasswordSchema) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className, 'flex flex-col gap-3')}>
                <FormField control={form.control} name="oldPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Old password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="old password..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="new password..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" onClick={() => toast('Verification has been sent')}>Save</Button>
            </form>
        </Form>
    )
}
export default ChangePasswordForm
