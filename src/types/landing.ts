export interface LandingNavItem {
    label: string
    href: string
}

export interface FloatingCardItem {
    title: string
    emoji: string
    accentClassName: string
    className: string
}

export interface HowItWorksItem {
    step: string
    title: string
    description: string
    emoji: string
    bodyClassName: string
}

export interface FeaturedEventItem {
    title: string
    date: string
    location: string
    priceLabel: string
    category: string
    attendees: string
    emoji: string
    imageClassName: string
}

export interface CategoryItem {
    name: string
    countLabel: string
    emoji: string
    className: string
}

export interface StatItem {
    value: string
    label: string
}
