import SectionHeading from "@/components/landing/SectionHeading"
import { categories } from "@/components/landing/landing-data"

export default function CategoriesSection() {
    return (
        <section id="categories" className="border-t-brutal border-border px-4 py-14 md:px-6">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Popular categories" />
                <div className="flex gap-4 overflow-x-auto pb-3">
                    {categories.map((category) => (
                        <article
                            key={category.name}
                            className={`flex min-h-14 min-w-max items-center gap-3 border-2 border-border px-5 py-4 shadow-brutal-sm transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal ${category.className}`}
                        >
                            <span className="text-2xl" aria-hidden="true">{category.emoji}</span>
                            <span className="flex flex-col">
                                <span className="font-heading text-base font-bold">{category.name}</span>
                                <span className="text-sm text-foreground/65">{category.countLabel}</span>
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
