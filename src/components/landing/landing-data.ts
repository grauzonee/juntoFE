import type {
    FloatingCardItem,
    HowItWorksItem,
    LandingNavItem,
} from "@/types/landing"

export const landingNavItems: LandingNavItem[] = [
    { label: "Discover", to: "/events" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Categories", href: "#categories" },
]

export const heroCards: FloatingCardItem[] = [
    {
        title: "Sunset Photography Walk",
        emoji: "📷",
        accentClassName: "bg-violet",
        className: "left-2 top-0 -rotate-3 md:left-6 md:top-4",
    },
    {
        title: "Board Game Night",
        emoji: "🎲",
        accentClassName: "bg-mint",
        className: "right-2 top-3 rotate-2 md:right-2 md:top-10",
    },
    {
        title: "Morning Yoga",
        emoji: "🧘",
        accentClassName: "bg-yellow",
        className: "bottom-10 left-3 -rotate-2 md:bottom-14 md:left-12",
    },
    {
        title: "Live Jazz Evening",
        emoji: "🎵",
        accentClassName: "bg-coral",
        className: "bottom-3 right-4 rotate-3 opacity-85 md:bottom-4 md:right-10",
    },
]

export const howItWorksItems: HowItWorksItem[] = [
    {
        step: "Step 1",
        title: "Discover",
        description: "Browse events near you by category, date, or vibe.",
        emoji: "🔎",
        bodyClassName: "bg-mint-light",
    },
    {
        step: "Step 2",
        title: "Join In",
        description: "Save your spot, chat with the group, and show up feeling welcome.",
        emoji: "🤝",
        bodyClassName: "bg-yellow",
    },
    {
        step: "Step 3",
        title: "Create",
        description: "Host your own meetup and bring your people together around what matters.",
        emoji: "✨",
        bodyClassName: "bg-violet-light",
    },
]
