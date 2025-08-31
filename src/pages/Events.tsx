import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"

function Events() {
    return (
        <>
            <div className="w-full h-8 bg-gray-400 text-center">Search</div>
            <div className="h-full flex flex-row w-full">
                <ResponsiveComponent isDesktop={true}>
                    <div className="bg-rose-200 w-1/3 aspect-square">Calendar</div>
                </ResponsiveComponent>
                <div className="flex flex-col bg-yellow-300 text-center flex-1">Events</div>
            </div>
        </>
    )
}

export default Events
