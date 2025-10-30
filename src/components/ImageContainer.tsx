import { type ReactNode } from "react"
interface ImageContainerProps {
    src: string
    children?: ReactNode
}
function ImageContainer({ src, children }: ImageContainerProps) {
    return (
        <div className="rounded-sm shadow overflow-hidden w-full max-h-80 relative border-2 border-border">
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
