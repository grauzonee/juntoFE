import { useParams } from "react-router";
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary'
import EventPage from "@/components/event/EventPage"

function NotFound() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16 md:px-6">
            <div className="border-brutal border-border bg-card px-8 py-10 text-center shadow-brutal-lg">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-violet">404</p>
                <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.06em]">Event not found</h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-foreground/70">
                    This event may have been removed or the link is no longer valid.
                </p>
            </div>
        </div>
    );
}

function SingleEvent() {
    const { id } = useParams();

    return (
        <ErrorBoundary
            fallbackRender={({ error }) =>
                error instanceof Error && error.message === "NOT_FOUND" ? <NotFound /> : <p>Error: {(error as Error).message}</p>
            } >
            <Suspense fallback={<p className="px-4 py-10 text-center text-sm font-semibold">Fetching event details...</p>}>
                <EventPage id={id!} />
            </Suspense>
        </ErrorBoundary>

    )
}

export default SingleEvent
