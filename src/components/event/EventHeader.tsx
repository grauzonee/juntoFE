import SiteHeader from "@/components/shell/SiteHeader"
import { testIds } from "@/testIds"

const navItems = [
    { label: "Home", to: "/" },
    { label: "Discover", to: "/events" },
]

export default function EventHeader() {
    return (
        <SiteHeader
            navItems={navItems}
            dataTestId={testIds.event.shellHeader}
            mobileMenuVariant="dropdown"
            className="bg-cream/95 backdrop-blur"
        />
    )
}
