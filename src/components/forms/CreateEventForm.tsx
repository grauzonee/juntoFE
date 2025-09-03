import { lazy } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, type CreateEventSchema } from "@/schemas/EventSchemas"
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/DatePicker";
const TagsInput = lazy(() => import("@/components/TagsInput"));
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const ChangeImageContainer = lazy(() => import("@/components/ChangeImageContainer"))

function CreateEventForm() {
    const form = useForm<CreateEventSchema>({
        resolver: zodResolver(createEventSchema)
    })

    function onSubmit(values: CreateEventSchema) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-5 justify-between">
                <FormField control={form.control} name="image" render={({ field }) => (
                    <FormItem className="h-fit w-2/5">
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <ChangeImageContainer {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <div>
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="title..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="description..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )} />
                    <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )} />
                    <FormField control={form.control} name="topics" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <FormControl>
                                <TagsInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )} />
                    <Button type="submit" onClick={() => toast('Event has been created')}>Save</Button>
                </div>

            </form>
        </Form>
    )
}

export default CreateEventForm
