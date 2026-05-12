import { isRouteErrorResponse, useRouteError } from "react-router"
import ErrorStatusPage from "@/components/errors/ErrorStatusPage"

function getFallbackPage(error: unknown) {
    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 400:
                return (
                    <ErrorStatusPage
                        code="400"
                        title="Bad request"
                        description="The route or request could not be understood."
                        actionLabel="Go home"
                        actionTo="/"
                        statusTone="yellow"
                    />
                )

            case 404:
                return (
                    <ErrorStatusPage
                        code="404"
                        title="Page not found"
                        description="We could not find the page you were looking for."
                        actionLabel="Go home"
                        actionTo="/"
                        statusTone="mint"
                    />
                )

            case 500:
            default:
                return (
                    <ErrorStatusPage
                        code="500"
                        title="Internal server error"
                        description="Something went wrong while loading this route."
                        actionLabel="Try again from home"
                        actionTo="/"
                        statusTone="coral"
                    />
                )
        }
    }

    if (error instanceof Error && /not found/i.test(error.message)) {
        return (
            <ErrorStatusPage
                code="404"
                title="Page not found"
                description={error.message}
                actionLabel="Go home"
                actionTo="/"
                statusTone="mint"
            />
        )
    }

    return (
        <ErrorStatusPage
            code="500"
            title="Internal server error"
            description={error instanceof Error ? error.message : "Something went wrong while loading this route."}
            actionLabel="Try again from home"
            actionTo="/"
            statusTone="coral"
        />
    )
}

export default function RouteErrorPage() {
    const error = useRouteError()

    return getFallbackPage(error)
}
