import { useEffect, useState } from "react";

type ResponsiveProps = {
    isDesktop?: boolean,
    isTablet?: boolean,
    isMobile?: boolean,
    children: React.ReactNode
}

function ResponsiveComponent(props: ResponsiveProps) {
    const [canRender, setCanRender] = useState(false)
    function handleResize() {
        const resolution = window.innerWidth;
        const isMobile = resolution >= 320 && resolution <= 480;
        const isTablet = resolution >= 768 && resolution <= 1024;
        const isDesktop = !isMobile && !isTablet;

        const canRender = (isMobile && props.isMobile) || (isDesktop && props.isDesktop) || (isTablet && props.isTablet) as boolean
        setCanRender(canRender)
    }
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    })

    if (canRender) {
        return (<>{props.children}</>)
    }
}

export default ResponsiveComponent
