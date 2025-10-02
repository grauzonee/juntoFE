import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, type CreateEventSchema } from "@/schemas/EventSchemas"
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const StaticData = lazy(() => import("@/components/forms/createEvent/StaticData"))
const MapData = lazy(() => import("@/components/forms/createEvent/MapData"))
import { createEvent } from "@/helpers/events";
import { type FormProps } from "@/types/props";
import { uploadMedia } from "@/helpers/media";

function CreateEventForm({ onSubmit }: FormProps) {
    const formSteps = [StaticData, MapData]
    const [step, setStep] = useState(0)

    const goToStep = (newStep: number) => {
        if (newStep < 0) return
        if (newStep > formSteps.length - 1) return
        setStep(newStep)
    }

    const StepComponent = formSteps[step]
    const form = useForm<CreateEventSchema>({
        resolver: zodResolver(createEventSchema)
    })

    async function onFormSubmit(values: CreateEventSchema) {
        try {
            const imageUrl = await uploadMedia(values.image)
            const formData = { ...values, imageUrl, date: Math.floor(values.date.getTime() / 1000) }
            delete formData.image
            await createEvent(formData)
            toast('Event has been created')
            onSubmit?.()
        } catch (error) {
            form.setError("root", { type: "manual", message: error instanceof Error ? error.message : undefined })

        }
    }
    console.log("form errors", form.formState.errors);

    const FormButtons = () => {
        if (step == 0) {
            return (<>
                <Button type="button" onClick={() => goToStep(step + 1)}>Next</Button>
            </>)
        }
        if (step == formSteps.length - 1) {
            return (<>
                <Button type="button" variant="secondary" onClick={() => goToStep(step - 1)}>Back</Button>
                <Button type="submit">Submit</Button>
            </>)
        }
        if (step < formSteps.length - 1) {
            return (<>
                <Button type="button" variant="secondary" onClick={() => goToStep(step - 1)}>Back</Button>
                <Button type="button" onClick={() => goToStep(step + 1)}>Next</Button>
            </>)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)}>
                {<StepComponent form={form} />}
                <div className="flex flex-row gap-3 mt-5">
                    <FormButtons />
                </div>
            </form>
        </Form >
    )
}

export default CreateEventForm
