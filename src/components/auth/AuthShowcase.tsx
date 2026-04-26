const showcaseCards = [
    {
        title: "Pottery & Coffee Circle",
        meta: "Saturday · 11:00",
        badge: "welcoming",
        className: "left-[2%] top-[6%] -rotate-6 xl:left-[4%]",
        cardClassName: "bg-cream",
    },
    {
        title: "Board Game Basement",
        meta: "Tonight · 19:30",
        badge: "new friends",
        className: "bottom-[14%] right-[2%] rotate-[5deg] xl:right-[4%]",
        cardClassName: "bg-mint-light",
    },
    {
        title: "Street Photo Walk",
        meta: "Sunday · 09:00",
        badge: "creative",
        className: "bottom-[8%] left-[8%] -rotate-3 xl:left-[12%]",
        cardClassName: "bg-yellow/90",
    },
]

export default function AuthShowcase() {
    return (
        <div className="relative hidden min-h-screen overflow-hidden border-r-brutal border-border bg-violet px-10 py-16 text-card lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
            <div className="relative z-10 max-w-xl">
                <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.24em] text-card/80">
                    Find your circle
                </p>
                <h1 className="mb-4 max-w-[7ch] font-display text-[clamp(4rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.08em] text-card">
                    Meet offline, belong online.
                </h1>
                <p className="max-w-md text-lg leading-7 text-card/90">
                    Join local events, discover new interests, and build the kind of community you actually want to keep showing up for.
                </p>
            </div>

            {showcaseCards.map((card) => (
                <article
                    key={card.title}
                    className={`absolute z-10 w-44 border-2 border-border px-4 py-3 text-foreground shadow-brutal-sm xl:w-48 ${card.cardClassName} ${card.className}`}
                >
                    <h3 className="mb-1 font-heading text-sm font-bold">{card.title}</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/55">
                        {card.meta}
                    </p>
                    <span className="mt-2 inline-flex border border-border bg-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                        {card.badge}
                    </span>
                </article>
            ))}

            <div className="absolute right-[14%] top-[10%] z-0 h-16 w-16 rounded-full border-brutal border-card/30" />
            <div className="absolute bottom-[20%] right-[28%] z-0 h-10 w-10 rounded-full bg-yellow/50" />
            <div className="absolute left-[5%] top-[32%] z-0 h-6 w-20 rotate-12 border-b-[3px] border-mint-light/80" />
            <div className="absolute bottom-[10%] right-[10%] z-0 grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <span key={index} className="h-2 w-2 rounded-full bg-card/30" />
                ))}
            </div>
        </div>
    )
}
