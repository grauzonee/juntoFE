import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, type CreateEventSchema } from "@/schemas/EventSchemas"
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const StaticData = lazy(() => import("@/components/forms/createEvent/StaticData"))
const MapData = lazy(() => import("@/components/forms/createEvent/MapData"))

function CreateEventForm() {
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

    function onSubmit(values: CreateEventSchema) {
        console.log(values)
    }

    const FormButtons = () => {
        if (step == 0) {
            return (<>
                <Button type="button" onClick={() => goToStep(step + 1)}>Next</Button>
            </>)
        }
        if (step == formSteps.length - 1) {
            return (<>
                <Button type="button" variant="secondary" onClick={() => goToStep(step - 1)}>Back</Button>
                <Button type="submit" onClick={() => toast('Event has been created')}>Submit</Button>
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {<StepComponent form={form} />}
                <div className="flex flex-row gap-3 mt-5">
                    <FormButtons />
                </div>
            </form>
        </Form >
    )
}

export default CreateEventForm
