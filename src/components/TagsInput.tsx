import { lazy, useState } from "react"
import { Input } from "@/components/ui/input"
const Badge = lazy(() => import("@/components/ui/badge").then(m => ({ default: m.Badge })));
import { X } from 'lucide-react';

type TagsInputProps = {
    value: string[],
    onChange: (val: string[]) => void
}

function TagsInput({ value = [], onChange }: TagsInputProps) {
    const [currentTag, setCurrentTag] = useState('')
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value?.toLowerCase()
        if (newValue.endsWith(' ')) {
            const cleaned = currentTag.trim()
            if (cleaned && !value.includes(cleaned)) {
                onChange([...value, cleaned])
            }
            setCurrentTag("")
        } else {
            setCurrentTag(newValue)
        }
    }

    const handleRemove = (tag: string) => {
        onChange(value.filter((t) => t !== tag))
    }

    return (
        <div className="flex flex-col gap-3">
            <Input placeholder="Type tags separated by space..." onChange={handleInput} value={currentTag} />
            <div className="w-full flex-wrap flex flex-row gap-1">
                {value.map((tag, index) => (
                    <Badge variant="secondary" className="relative px-4" key={index}>{tag}
                        <X className="absolute top-0 right-0 bg-red-600 text-white rounded-full cursor-pointer" onClick={() => handleRemove(tag)} />
                    </Badge>
                ))}
            </div>
        </div>
    )
}

export default TagsInput
