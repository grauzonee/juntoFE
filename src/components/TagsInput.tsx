import { lazy, useState } from "react"
import { Input } from "@/components/ui/input"
const Badge = lazy(() => import("@/components/ui/badge").then(m => ({ default: m.Badge })));
import { X } from 'lucide-react';

type TagsInputProps = {
    tags: string[],
    onTagAdd: (val: string) => void,
    onTagRemove: (val: string) => void,
}

function TagsInput({ tags, onTagAdd, onTagRemove }: TagsInputProps) {
    const [currentTag, setCurrentTag] = useState('')
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value?.toLowerCase()
        if (newValue.endsWith(' ')) {
            onTagAdd(currentTag.replace(' ', ''));
            setCurrentTag('')
        } else {
            setCurrentTag(newValue)
        }
    }
    return (
        <div className="flex flex-col gap-3">
            <Input placeholder="Type tags separated by space..." onChange={handleInput} value={currentTag} />
            <div className="w-full flex-wrap flex flex-row gap-1">
                {tags.map((tag, index) => (
                    <Badge variant="secondary" className="relative px-4" key={index}>{tag}
                        <X className="absolute top-0 right-0 bg-red-600 text-white rounded-full cursor-pointer" onClick={() => onTagRemove(tag)} />
                    </Badge>
                ))}
            </div>
        </div>
    )
}

export default TagsInput
