import { Card } from "@/components/ui/card"
import Discussion from "@/components/comment/Discussion"
import { useParams } from "react-router";
import EventDataPanel from "./EventDataPanel"
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary'

function NotFound() {
    return <h1>404 – Event not found</h1>;
}

function SingleEvent() {
    const { id } = useParams();

    return (
        <ErrorBoundary
            fallbackRender={({ error }) =>
                error instanceof Error && error.message === "NOT_FOUND" ? <NotFound /> : <p>Error: {(error as Error).message}</p>
            } >
            <Suspense fallback={<p>Fetching event details...</p>}>
                <Card className="w-full flex flex-col md:gap-5 md:bg-main md:p-3 p-0 border-0 shadow-0 md:shadow-shadow md:border-border md:border-2 bg-transparent">
                    <EventDataPanel id={id!} />

                    <Discussion />
                    <h3 className="text-foreground">Similar Events</h3>
                    {/* <EventCarousel events={[event, event, event, event]} /> */}
                </Card >
            </Suspense>
        </ErrorBoundary>

    )
}

export default SingleEvent
