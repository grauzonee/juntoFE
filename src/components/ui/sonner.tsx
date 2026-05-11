import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            position="top-center"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-foreground group-[.toaster]:text-background group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-background/75",
                    actionButton:
                        "group-[.toast]:bg-background group-[.toast]:text-foreground",
                    cancelButton:
                        "group-[.toast]:bg-background/90 group-[.toast]:text-foreground",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
