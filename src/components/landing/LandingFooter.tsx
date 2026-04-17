import SiteFooter from "@/components/shell/SiteFooter"

const links = [
    { label: "Discover", href: "#discover" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Categories", href: "#categories" },
]

export default function LandingFooter() {
    return <SiteFooter label="Junto community club" links={links} />
}
