import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangePasswordSchema, changePasswordSchema } from "@/schemas/ProfileSchemas";
import { updatePassword } from "@/helpers/user";
import { isFormError } from "@/types/FormError";

function ChangePasswordForm({ className }: HTMLAttributes<HTMLDivElement>) {
    const form = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema)
    })

    async function onSubmit(values: ChangePasswordSchema) {
        try {
            await updatePassword(values);
            toast('Password has been changed!')
        } catch (error) {
            if (isFormError<ChangePasswordSchema>(error)) {
                form.setError(error.field, { type: "manual", message: error.message })
            }
            form.setError("root", { type: "manual", message: error instanceof Error ? error.message : "Network error" })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className, 'flex flex-col gap-3')}>
                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm mt-1 text-center">
                        {form.formState.errors.root.message}
                    </p>
                )}
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
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}
export default ChangePasswordForm
