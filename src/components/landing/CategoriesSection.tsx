import SectionHeading from "@/components/landing/SectionHeading"

export default function CategoriesSection() {
    return (
        <section id="categories" className="border-t-brutal border-border px-4 py-14 md:px-6">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Popular categories" />
                <div className="border-2 border-dashed border-border bg-card px-5 py-6 text-foreground/70 shadow-brutal-sm">
                    Popular categories need a public backend endpoint with backend-computed ranking before they can be shown here.
                </div>
            </div>
        </section>
    )
}
