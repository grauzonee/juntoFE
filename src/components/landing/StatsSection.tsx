import { stats } from "@/components/landing/landing-data"

export default function StatsSection() {
    return (
        <section className="border-y-[3px] border-border bg-mint px-4 py-14 md:px-6">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
                {stats.map((stat) => (
                    <article
                        key={stat.label}
                        className="border-[3px] border-border bg-card px-6 py-8 text-center shadow-[5px_5px_0_0_hsl(var(--border))] transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_hsl(var(--border))]"
                    >
                        <div className="mb-2 font-display text-5xl font-extrabold leading-none md:text-6xl">{stat.value}</div>
                        <p className="text-lg text-foreground/75">{stat.label}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
