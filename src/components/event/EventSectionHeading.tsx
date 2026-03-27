import { cn } from "@/lib/utils"

type EventSectionHeadingProps = {
    label: string
    meta?: string
    className?: string
}

export default function EventSectionHeading({
    label,
    meta,
    className,
}: EventSectionHeadingProps) {
    return (
        <div className={cn("mb-5 flex items-center justify-between gap-3", className)}>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                {label}
            </span>
            {meta ? (
                <span className="text-sm font-bold text-violet">{meta}</span>
            ) : null}
        </div>
    )
}
