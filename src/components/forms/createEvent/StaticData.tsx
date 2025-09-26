import { lazy } from "react";
import { type UseFormReturn } from "react-hook-form"
import { type CreateEventSchema } from "@/schemas/EventSchemas"
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
const ChangeImageContainer = lazy(() => import("@/components/ChangeImageContainer"))
import DatePicker from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const TagsInput = lazy(() => import("@/components/TagsInput"));

function StaticData({ form }: { form: UseFormReturn<CreateEventSchema> }) {
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <FormField control={form.control} name="image" render={({ field }) => (
                <FormItem className="h-fit md:w-2/5">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <ChangeImageContainer {...field} aspect={4 / 3} />
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
            </div>
        </div>


    )
}

export default StaticData
