import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

type SearchFormProps = {
    value?: string,
    onChange: (val: string) => void
}

function SearchForm({ onChange }: SearchFormProps) {
    const [searchVal, setSearchVal] = useState('')
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchVal) {
            onChange(searchVal)
        }
    };
    return (
        <div className='flex flex-row flex-1 items-center gap-3'>
            <Search className='text-gray-700' />
            <Input className="flex-1" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} onKeyDown={handleKeyDown} />
        </div>

    )
}

export default SearchForm
