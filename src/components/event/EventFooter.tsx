import SiteFooter from "@/components/shell/SiteFooter"
import { testIds } from "@/testIds"

const links = [
    { label: "Home", to: "/" },
    { label: "Discover", to: "/events" },
    { label: "Log in", to: "/login" },
]

export default function EventFooter() {
    return (
        <SiteFooter
            label="Junto event club"
            links={links}
            dataTestId={testIds.event.shellFooter}
        />
    )
}
