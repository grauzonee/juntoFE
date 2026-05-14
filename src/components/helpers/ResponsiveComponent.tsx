import { useEffect, useState, type ReactNode } from "react"

type ResponsiveProps = Readonly<{
    isDesktop?: boolean
    isTablet?: boolean
    isMobile?: boolean
    children: ReactNode
}>

function ResponsiveComponent({ children, isDesktop, isMobile, isTablet }: ResponsiveProps) {
    const [canRender, setCanRender] = useState(false)

    function handleResize() {
        const resolution = globalThis.innerWidth
        const matchesMobile = resolution >= 320 && resolution <= 767
        const matchesTablet = resolution >= 768 && resolution <= 1024
        const matchesDesktop = resolution > 1024

        setCanRender(
            Boolean(
                (matchesMobile && isMobile)
                || (matchesDesktop && isDesktop)
                || (matchesTablet && isTablet),
            ),
        )
    }

    useEffect(() => {
        handleResize()
        globalThis.addEventListener("resize", handleResize)

        return () => globalThis.removeEventListener("resize", handleResize)
    })

    if (canRender) {
        return <>{children}</>
    }

    return null
}

export default ResponsiveComponent
