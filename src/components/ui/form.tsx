"use client"

import { AlertCircle } from "lucide-react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
    Controller,
    useFormContext,
    useFormState,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form"

import * as React from "react"

import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

export { FormProvider as Form } from "react-hook-form"

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
    null,
)

export function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
    const contextValue = React.useMemo(
        () => ({ name: props.name }),
        [props.name],
    )

    return (
        <FormFieldContext.Provider value={contextValue}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
    }

    if (!itemContext) {
        throw new Error("useFormField should be used within <FormItem>")
    }

    const { getFieldState } = useFormContext()
    const formState = useFormState({ name: fieldContext.name })
    const fieldState = getFieldState(fieldContext.name, formState)
    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(
    null,
)

export function FormItem({ className, ...props }: React.ComponentProps<"div">) {
    const id = React.useId()
    const contextValue = React.useMemo(() => ({ id }), [id])

    return (
        <FormItemContext.Provider value={contextValue}>
            <div
                data-slot="form-item"
                className={cn("grid gap-2", className)}
                {...props}
            />
        </FormItemContext.Provider>
    )
}

export function FormLabel({
    className,
    ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
    const { error, formItemId } = useFormField()

    return (
        <Label
            data-slot="form-label"
            data-error={Boolean(error)}
            className={cn("font-heading data-[error=true]:text-coral", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
}

export function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            data-slot="form-control"
            id={formItemId}
            aria-describedby={
                error
                    ? `${formDescriptionId} ${formMessageId}`
                    : formDescriptionId
            }
            aria-invalid={Boolean(error)}
            {...props}
        />
    )
}

export function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
    const { formDescriptionId } = useFormField()

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn("text-sm font-base text-foreground", className)}
            {...props}
        />
    )
}

export function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message ?? "") : props.children

    if (!body) {
        return null
    }

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            role="alert"
            aria-live="polite"
            className={cn(
                "flex items-start gap-2 border-l-[3px] border-coral bg-coral/10 px-2 py-1 text-xs font-heading text-coral rounded-none motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200",
                className,
            )}
            {...props}
        >
            <span aria-hidden="true" className="mt-1 block size-2 shrink-0 bg-coral" />
            <span className="leading-snug">{body}</span>
        </p>
    )
}

type FormRootMessageProps = React.ComponentProps<"div"> & {
    message?: string | null
}

export function FormRootMessage({ message, className, children, ...props }: FormRootMessageProps) {
    const body = message ?? children

    if (!body) {
        return null
    }

    return (
        <div
            data-slot="form-root-message"
            role="alert"
            aria-live="polite"
            className={cn(
                "flex items-start gap-2 border-2 border-border bg-coral px-3 py-2 text-sm font-heading text-white shadow-shadow rounded-none motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200",
                className,
            )}
            {...props}
        >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span className="leading-snug">{body}</span>
        </div>
    )
}
