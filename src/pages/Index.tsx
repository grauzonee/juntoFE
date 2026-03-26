import CategoriesSection from "@/components/landing/CategoriesSection"
import FeaturedEventsSection from "@/components/landing/FeaturedEventsSection"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import LandingCta from "@/components/landing/LandingCta"
import LandingFooter from "@/components/landing/LandingFooter"
import LandingHeader from "@/components/landing/LandingHeader"
import LandingHero from "@/components/landing/LandingHero"
import StatsSection from "@/components/landing/StatsSection"

export default function Index() {
    return (
        <>
            <LandingHeader />
            <main>
                <LandingHero />
                <HowItWorksSection />
                <FeaturedEventsSection />
                <CategoriesSection />
                <StatsSection />
                <LandingCta />
            </main>
            <LandingFooter />
        </>
    )
}
