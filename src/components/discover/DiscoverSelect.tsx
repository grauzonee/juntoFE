import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type DiscoverSelectOption<Value extends string = string> = {
    value: Value
    label: string
}

type DiscoverSelectTone = "cream" | "yellow" | "violet"
type DiscoverSelectSize = "compact" | "default"
type DiscoverSelectVariant = "framed" | "plain"

type DiscoverSelectProps<Value extends string = string> = {
    label: string
    value: Value
    options: ReadonlyArray<DiscoverSelectOption<Value>>
    onValueChange: (value: Value) => void
    className?: string
    contentClassName?: string
    itemClassName?: string
    size?: DiscoverSelectSize
    tone?: DiscoverSelectTone
    triggerClassName?: string
    variant?: DiscoverSelectVariant
}

const selectToneClassNames: Record<DiscoverSelectTone, string> = {
    cream: "bg-card text-foreground",
    yellow: "bg-yellow text-foreground",
    violet: "bg-violet text-card [&_svg]:text-card",
}

const framedSizeClassNames: Record<DiscoverSelectSize, string> = {
    compact: "h-12",
    default: "h-14",
}

const plainSizeClassNames: Record<DiscoverSelectSize, string> = {
    compact: "h-11 text-sm",
    default: "h-12 text-base",
}

export default function DiscoverSelect<Value extends string = string>({
    label,
    value,
    options,
    onValueChange,
    className,
    contentClassName,
    itemClassName,
    size = "default",
    tone = "cream",
    triggerClassName,
    variant = "framed",
}: Readonly<DiscoverSelectProps<Value>>) {
    const isFramed = variant === "framed"
    const triggerFrameClassName = isFramed
        ? "h-full border-2 border-border px-3"
        : "w-full border-brutal border-border px-4"
    let triggerTextSizeClassName = plainSizeClassNames[size]

    if (isFramed) {
        triggerTextSizeClassName = size === "compact" ? "text-sm" : "text-base"
    }

    return (
        <div
            className={cn(
                "w-full",
                isFramed && "border-brutal border-border bg-card p-1",
                isFramed && framedSizeClassNames[size],
                className,
            )}
        >
            <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as Value)}>
                <SelectTrigger
                    aria-label={label}
                    className={cn(
                        "min-h-0 rounded-none font-heading font-bold shadow-none",
                        triggerFrameClassName,
                        triggerTextSizeClassName,
                        selectToneClassNames[tone],
                        triggerClassName,
                    )}
                >
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent
                    className={cn(
                        "rounded-none border-brutal border-border bg-card text-foreground shadow-brutal-sm",
                        contentClassName,
                    )}
                    sideOffset={6}
                >
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            className={cn(
                                "rounded-none px-3 py-2 font-heading text-sm font-bold focus:border-border focus:bg-mint-light",
                                itemClassName,
                            )}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
