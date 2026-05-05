export type LandingNavItem =
    | { label: string; href: string; to?: never }
    | { label: string; to: string; href?: never }

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
