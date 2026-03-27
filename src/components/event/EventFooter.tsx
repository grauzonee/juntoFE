import { Link } from "react-router"

export default function EventFooter() {
    return (
        <footer className="border-t-[3px] border-border bg-cream px-4 py-6 md:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">Junto event club</p>
                <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-foreground/75 md:justify-end">
                    <Link to="/" className="transition-colors hover:text-violet">Home</Link>
                    <Link to="/events" className="transition-colors hover:text-violet">Discover</Link>
                    <Link to="/login" className="transition-colors hover:text-violet">Log in</Link>
                </div>
            </div>
        </footer>
    )
}
