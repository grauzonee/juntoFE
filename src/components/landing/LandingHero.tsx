import { Link } from "react-router"
import BrutalButton from "@/components/landing/BrutalButton"
import { heroCards } from "@/components/landing/landing-data"

export default function LandingHero() {
    return (
        <section className="overflow-hidden px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_32rem] lg:items-center lg:gap-16">
                <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.24em] text-violet">
                        Neighbors, hobbies, nights out
                    </p>
                    <h1 className="mb-5 max-w-[8ch] font-display text-[clamp(2.9rem,7vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.07em]">
                        Find Your People.
                        <br />
                        Join the Fun.
                    </h1>
                    <p className="mb-8 max-w-xl text-lg leading-7 text-foreground/75 md:text-xl">
                        Discover local events, make real connections, and explore your passions with people who get it.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <BrutalButton asChild tone="mint" className="text-base">
                            <Link to="/events">Explore Events</Link>
                        </BrutalButton>
                        <BrutalButton asChild tone="violet" className="text-base">
                            <Link to="/register">Create an Event</Link>
                        </BrutalButton>
                    </div>
                </div>

                <div className="relative mx-auto h-[20rem] w-full max-w-[32rem] animate-in fade-in slide-in-from-bottom-8 duration-700 md:h-[26rem]">
                    <div className="absolute right-20 top-2 hidden h-6 w-24 rotate-12 bg-[repeating-linear-gradient(90deg,hsl(var(--coral))_0px,hsl(var(--coral))_6px,transparent_6px,transparent_12px)] md:block" />
                    <div className="absolute left-0 top-28 hidden h-8 w-8 bg-[radial-gradient(circle,hsl(var(--violet))_3px,transparent_3px)] [background-size:10px_10px] md:block" />
                    <span className="absolute left-2 top-8 font-display text-2xl animate-pulse">✦</span>
                    <span className="absolute bottom-6 right-2 font-display text-2xl animate-pulse [animation-delay:700ms]">✦</span>
                    <div className="absolute bottom-20 left-0 h-4 w-4 rounded-full border-2 border-border bg-yellow" />
                    <div className="absolute right-8 top-24 h-4 w-4 rounded-full border-2 border-border bg-mint-light" />

                    {heroCards.map((card, index) => (
                        <div
                            key={card.title}
                            className={`absolute w-[10rem] border-2 border-border bg-card p-4 shadow-brutal transition duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg md:w-[13.75rem] ${card.className}`}
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            <div className="mb-3 text-3xl">{card.emoji}</div>
                            <div className="mb-3 font-heading text-sm font-bold md:text-base">{card.title}</div>
                            <div className={`h-1 w-10 border border-border ${card.accentClassName}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
