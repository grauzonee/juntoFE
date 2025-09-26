import { lazy } from 'react';
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
import { updateUser, getUser } from '@/helpers/user';
import type { User } from '@/types/User';
import { useState, useEffect } from 'react';

type EditProfileFormProps = {
    onSubmit?: () => void
}

function EditProfileForm({ onSubmit }: EditProfileFormProps) {
    const [user, setUser] = useState<User | null>(null)
    const form = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema)
    })

    useEffect(() => {
        getUser().then((response) => {
            setUser(response)
            form.reset({
                username: response.username,
                interests: response.interests
            });
        });
    }, [form])


    async function onFormSubmit(values: EditProfileSchema) {
        try {
            await updateUser(values)
            onSubmit?.()
        } catch (error) {
            form.setError("root", { type: "manual", message: error instanceof Error ? error.message : undefined })
        }
    }

    return (
        <Form {...form}>
            {form.formState.errors.root && (
                <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.root.message}
                </p>
            )}
            {user && <form onSubmit={form.handleSubmit(onFormSubmit)} className='flex flex-col gap-3'>
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
