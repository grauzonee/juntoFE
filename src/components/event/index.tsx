import { useParams } from "react-router";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import EventPage from "@/components/event/EventPage"
import NotFoundPage from "@/pages/errors/NotFound"
import InternalServerErrorPage from "@/pages/errors/InternalServerError"

function EventRouteErrorFallback({ error }: Readonly<{ error: unknown }>) {
    if (error instanceof Error && /not found/i.test(error.message)) {
        return <NotFoundPage />
    }

    return <InternalServerErrorPage />
}

function renderEventRouteErrorFallback({ error }: FallbackProps) {
    return <EventRouteErrorFallback error={error} />
}

function SingleEvent() {
    const { id } = useParams();

    if (!id) {
        throw new Error("NOT_FOUND")
    }

    return (
        <ErrorBoundary
            fallbackRender={renderEventRouteErrorFallback}
        >
            <Suspense fallback={<p className="px-4 py-10 text-center text-sm font-semibold">Fetching event details...</p>}>
                <EventPage id={id} />
            </Suspense>
        </ErrorBoundary>

    )
}

export default SingleEvent
