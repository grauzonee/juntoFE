export const responsiveVariants = {
    desktop: "desktop",
    mobile: "mobile",
} as const

export type ResponsiveVariant = typeof responsiveVariants[keyof typeof responsiveVariants]

export const defaultResponsiveVariant: ResponsiveVariant = responsiveVariants.desktop

export function isMobile(variant: ResponsiveVariant) {
    return variant === responsiveVariants.mobile
}

export function isDesktop(variant: ResponsiveVariant) {
    return variant === responsiveVariants.desktop
}
