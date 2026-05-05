import SectionHeading from "@/components/landing/SectionHeading"
import WindowCard from "@/components/ui/window-card"
import { howItWorksItems } from "@/components/landing/landing-data"

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="bg-violet-light px-4 py-14 md:px-6">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="How it works" />
                <div className="grid gap-7 lg:grid-cols-3">
                    {howItWorksItems.map((item) => (
                        <WindowCard key={item.step} titlebarLabel={item.step} className="transition duration-150 hover:-translate-x-1 hover:-translate-y-1">
                            <div className={`${item.bodyClassName} px-6 py-8`}>
                                <div className="mb-2 font-display text-6xl font-extrabold leading-none">{item.step.replace("Step ", "")}</div>
                                <div className="mb-4 text-4xl">{item.emoji}</div>
                                <h3 className="mb-2 font-heading text-2xl font-bold">{item.title}</h3>
                                <p className="text-base leading-6 text-foreground/85">{item.description}</p>
                            </div>
                        </WindowCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
