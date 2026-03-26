import type {
    CategoryItem,
    FeaturedEventItem,
    FloatingCardItem,
    HowItWorksItem,
    LandingNavItem,
    StatItem,
} from "@/types/landing"

export const landingNavItems: LandingNavItem[] = [
    { label: "Discover", href: "#discover" },
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

export const featuredEvents: FeaturedEventItem[] = [
    {
        title: "Creative Mornings Sketch Club",
        date: "Saturday, 10:00 AM",
        location: "Neubau, Vienna",
        priceLabel: "Free",
        category: "Art",
        attendees: "18 people going",
        emoji: "🎨",
        imageClassName: "bg-violet-light",
    },
    {
        title: "Rooftop Sunset Yoga Flow",
        date: "Sunday, 6:30 PM",
        location: "Leopoldstadt, Vienna",
        priceLabel: "Paid",
        category: "Wellbeing",
        attendees: "24 people going",
        emoji: "🌇",
        imageClassName: "bg-mint-light",
    },
    {
        title: "Late Night Vinyl Exchange",
        date: "Friday, 8:00 PM",
        location: "Margareten, Vienna",
        priceLabel: "Free",
        category: "Music",
        attendees: "31 people going",
        emoji: "🎧",
        imageClassName: "bg-yellow",
    },
]

export const categories: CategoryItem[] = [
    { name: "Art & Design", countLabel: "120+ gatherings", emoji: "🎨", className: "bg-violet-light" },
    { name: "Games", countLabel: "80+ meetups", emoji: "🎲", className: "bg-mint-light" },
    { name: "Fitness", countLabel: "150+ sessions", emoji: "🏃", className: "bg-yellow" },
    { name: "Foodies", countLabel: "60+ tastings", emoji: "🍜", className: "bg-coral" },
    { name: "Music", countLabel: "90+ jams", emoji: "🎵", className: "bg-violet-light" },
    { name: "Outdoors", countLabel: "70+ adventures", emoji: "⛰️", className: "bg-mint-light" },
]

export const stats: StatItem[] = [
    { value: "12K+", label: "members finding their people" },
    { value: "430+", label: "events hosted each month" },
    { value: "28", label: "cities with active communities" },
]
