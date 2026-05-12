import { useParams } from "react-router";
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary'
import EventPage from "@/components/event/EventPage"
import NotFoundPage from "@/pages/errors/NotFound"
import InternalServerErrorPage from "@/pages/errors/InternalServerError"

function SingleEvent() {
    const { id } = useParams();

    return (
        <ErrorBoundary
            fallbackRender={({ error }) =>
                error instanceof Error && /not found/i.test(error.message)
                    ? <NotFoundPage />
                    : <InternalServerErrorPage />
            } >
            <Suspense fallback={<p className="px-4 py-10 text-center text-sm font-semibold">Fetching event details...</p>}>
                <EventPage id={id!} />
            </Suspense>
        </ErrorBoundary>

    )
}

export default SingleEvent
