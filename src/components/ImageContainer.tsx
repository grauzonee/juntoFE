import { cn } from "@/lib/utils"
import { type ReactNode } from "react"
type ImageContainerProps = React.ComponentProps<'div'> & {
    src: string
    children?: ReactNode
}
function ImageContainer({ src, children, className }: ImageContainerProps) {
    return (
        <div className={cn("rounded-sm shadow overflow-hidden w-full max-h-80 relative border-2 border-border", className)}>
            <img
                src={src}
                alt="Event"
                className="w-full object-center h-auto"
            />
            {children}
        </div>

    )
}
export default ImageContainer
