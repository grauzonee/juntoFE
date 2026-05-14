import { useParams } from "react-router";
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary'
import EventPage from "@/components/event/EventPage"
import NotFoundPage from "@/pages/errors/NotFound"
import InternalServerErrorPage from "@/pages/errors/InternalServerError"

function EventRouteErrorFallback({ error }: Readonly<{ error: unknown }>) {
    if (error instanceof Error && /not found/i.test(error.message)) {
        return <NotFoundPage />
    }

    return <InternalServerErrorPage />
}

function SingleEvent() {
    const { id } = useParams();

    if (!id) {
        throw new Error("NOT_FOUND")
    }

    return (
        <ErrorBoundary
            fallbackRender={({ error }) => <EventRouteErrorFallback error={error} />}
        >
            <Suspense fallback={<p className="px-4 py-10 text-center text-sm font-semibold">Fetching event details...</p>}>
                <EventPage id={id} />
            </Suspense>
        </ErrorBoundary>

    )
}

export default SingleEvent
