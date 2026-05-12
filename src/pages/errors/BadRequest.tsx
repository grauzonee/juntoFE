import ErrorStatusPage from "@/components/errors/ErrorStatusPage"

export default function BadRequestPage() {
    return (
        <ErrorStatusPage
            code="400"
            title="Bad request"
            description="The link or request could not be processed."
            actionLabel="Go home"
            actionTo="/"
            statusTone="yellow"
        />
    )
}
