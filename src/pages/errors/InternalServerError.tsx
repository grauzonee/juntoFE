import ErrorStatusPage from "@/components/errors/ErrorStatusPage"

export default function InternalServerErrorPage() {
    return (
        <ErrorStatusPage
            code="500"
            title="Internal server error"
            description="Something went wrong on our side. Please try again from the home page."
            actionLabel="Try again from home"
            actionTo="/"
            statusTone="coral"
        />
    )
}
