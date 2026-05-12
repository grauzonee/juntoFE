import { useEffect } from "react"
import { Link, useNavigate } from "react-router"
import ErrorStatusPage from "@/components/errors/ErrorStatusPage"

const REDIRECT_DELAY_MS = 1800

export default function MovedPermanentlyPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            navigate("/", { replace: true })
        }, REDIRECT_DELAY_MS)

        return () => window.clearTimeout(timeoutId)
    }, [navigate])

    return (
        <ErrorStatusPage
            code="301"
            title="Moved permanently"
            description="This page now lives somewhere else. You will be redirected to the home page shortly."
            actionLabel="Go home now"
            actionTo="/"
            statusTone="violet"
        >
            <p className="text-sm font-semibold text-foreground/70">
                Redirecting in {Math.ceil(REDIRECT_DELAY_MS / 1000)} seconds.
                {" "}
                <Link to="/" className="underline underline-offset-4">
                    Continue now
                </Link>
            </p>
        </ErrorStatusPage>
    )
}
