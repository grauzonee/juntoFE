import CategoriesSection from "@/components/landing/CategoriesSection"
import FeaturedEventsSection from "@/components/landing/FeaturedEventsSection"
import Footer from "@/components/Footer"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import LandingCta from "@/components/landing/LandingCta"
import LandingHeader from "@/components/landing/LandingHeader"
import LandingHero from "@/components/landing/LandingHero"

export default function Index() {
    return (
        <>
            <LandingHeader />
            <main>
                <LandingHero />
                <HowItWorksSection />
                <FeaturedEventsSection />
                <CategoriesSection />
                <LandingCta />
            </main>
            <Footer />
        </>
    )
}
