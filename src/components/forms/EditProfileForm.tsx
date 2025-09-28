import { lazy, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { type EditProfileSchema, editProfileSchema } from "@/schemas/ProfileSchemas"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const TagsInput = lazy(() => import('@/components/TagsInput'));
import { updateUser } from '@/helpers/user';
import { useEffect } from 'react';
import { isFormError } from '@/types/FormError';
import { toast } from "sonner";

type EditProfileFormProps = {
    onSubmit?: () => void
}

function EditProfileForm({ onSubmit }: EditProfileFormProps) {
    const { user, refreshUser } = useContext(UserContext)
    const form = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            username: user?.username ?? '',
            interests: user?.interests ?? [],
        }
    })
    useEffect(() => {
        form.reset({
            username: user ? user.username : '',
            interests: user ? user.interests : []
        });

    }, [form, user])

    async function onFormSubmit(values: EditProfileSchema) {
        try {
            await updateUser(values)
            refreshUser()
            onSubmit?.()
            toast('Data updated!')
        } catch (error) {
            if (isFormError<EditProfileSchema>(error)) {
                form.setError(error.field, { type: "manual", message: error.message ?? 'Validation error' })
            } else {
                form.setError("root", { type: "manual", message: error instanceof Error ? error.message : undefined })
            }
        }
    }

    return (
        <Form {...form}>
            {user && <form onSubmit={form.handleSubmit(onFormSubmit)} className='flex flex-col gap-3'>
                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm mt-1 text-center">
                        {form.formState.errors.root.message}
                    </p>
                )}
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="username..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="interests" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Interests</FormLabel>
                        <FormControl>
                            <TagsInput {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit">Save</Button>
            </form>}
        </Form>
    )
}

export default EditProfileForm
