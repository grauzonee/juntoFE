import { Link } from "react-router"
import BrutalButton from "@/components/ui/brutal-button"

export default function LandingCta() {
    return (
        <section className="relative overflow-hidden border-b-brutal border-border bg-yellow px-4 py-20 text-center md:px-6">
            <div className="absolute left-[8%] top-10 h-10 w-10 rounded-full border-brutal border-border" />
            <div className="absolute bottom-10 left-[15%] h-5 w-5 rotate-[-12deg] border-2 border-border bg-mint" />
            <div className="absolute right-[10%] top-14 h-7 w-7 rotate-[15deg] border-brutal border-border" />
            <div className="absolute bottom-14 right-[12%] h-6 w-6 rounded-full border-2 border-border bg-violet" />
            <div className="mx-auto max-w-3xl">
                <h2 className="mb-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em]">
                    Ready to meet your next favorite people?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg leading-7 text-foreground/75">
                    Jump into nearby events, start something of your own, and turn shared interests into real community.
                </p>
                <BrutalButton asChild tone="violet" className="px-10 py-4 text-lg">
                    <Link to="/register">Join Junto today</Link>
                </BrutalButton>
                <p className="mt-5 text-sm text-foreground/80">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold underline decoration-2 underline-offset-2">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    )
}
