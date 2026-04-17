import { cva } from "class-variance-authority"

export const cardVariants = cva(
    "rounded-base flex flex-col gap-6 py-6 bg-background text-foreground font-base",
    {
        variants: {
            variant: {
                default: "border-border border-2 shadow-shadow",
                flat: "border-brutal border-border shadow-none",
                raised: "border-brutal border-border shadow-brutal-lg",
                interactive:
                    "border-brutal border-border shadow-brutal transition duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg",
                inset: "border-brutal border-border shadow-inset",
                ghost: "shadow-none",
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)
