import { Mail } from 'lucide-react';

function Footer() {
    return (
        <div className="h-[15rem] bg-gray-900 w-full flex flex-col md:flex-row justify-evenly text-primary-foreground/40 pt-5">
            <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <p className="font-bold">Inspired by</p>
                    <a href="https://www.meetup.com">Meetup</a>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-bold">Find me</p>
                    <a href="https://github.com/grauzonee">Github</a>
                    <a href="https://www.linkedin.com/in/tatiana-goloviznina-951b43255/">Linkedin</a>
                    <span className='block flex flex-row gap-2'><Mail />trake1524@gmail.com</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-bold">Used libraries</p>
                <a href="https://ui.shadcn.com/">Shadcn</a>
                <a href="https://zod.dev/">Zod</a>
                <a href="https://foliotek.github.io/Croppie/">Croppie</a>
                <a href="https://react-leaflet.js.org/">React-leaflet</a>
                <a href="https://react-leaflet.js.org/">Lucide</a>
            </div>
        </div>
    )
}
export default Footer
