import { cva } from "class-variance-authority"
export const cardVariants = cva(

    "rounded-base flex flex-col gap-6 py-6 bg-background text-foreground font-base",
    {
        variants: {
            variant: {
                default: "border-border border-2 shadow-shadow",
                ghost: "shadow-none"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)
