import ErrorStatusPage from "@/components/errors/ErrorStatusPage"

export default function NotFoundPage() {
    return (
        <ErrorStatusPage
            code="404"
            title="Page not found"
            description="The page you asked for does not exist or has moved."
            actionLabel="Go home"
            actionTo="/"
            statusTone="mint"
        />
    )
}
