import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

function SearchForm() {

    return (
        <div className='flex flex-row flex-1 items-center gap-3'>
            <Search className='text-gray-700' />
            <Input className="flex-1" />
        </div>

    )
}

export default SearchForm
