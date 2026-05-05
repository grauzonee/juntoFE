import SiteHeader from "@/components/shell/SiteHeader"
import { landingNavItems } from "@/components/landing/landing-data"
import { testIds } from "@/testIds"

export default function LandingHeader() {
    return (
        <SiteHeader
            navItems={landingNavItems}
            dataTestId={testIds.landing.header}
            mobileMenuTriggerTestId={testIds.landing.mobileMenuTrigger}
            mobileMenuTestId={testIds.landing.mobileMenu}
            mobileMenuInnerTestId={testIds.landing.mobileMenuInner}
            sticky={false}
        />
    )
}
