export default function LandingFooter() {
    return (
        <footer className="border-t-[3px] border-border bg-cream px-4 py-6 md:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">Junto community club</p>
                <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-foreground/75 md:justify-end">
                    <a href="#discover" className="transition-colors hover:text-violet">Discover</a>
                    <a href="#how-it-works" className="transition-colors hover:text-violet">How it works</a>
                    <a href="#categories" className="transition-colors hover:text-violet">Categories</a>
                </div>
            </div>
        </footer>
    )
}
