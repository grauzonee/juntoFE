import ResponsiveComponent from "@/components/helpers/ResponsiveComponent"
import Event from "@/components/Event"

function Events() {
    return (
        <>
            <div className="w-full h-8 bg-gray-400 text-center">Search</div>
            <div className="h-full flex flex-row w-full gap-5">
                <ResponsiveComponent isDesktop={true}>
                    <div className="bg-rose-200 w-1/3 aspect-square">Calendar</div>
                </ResponsiveComponent>
                <div className="flex flex-col text-center flex-1 gap-3">
                    <Event />
                    <Event />
                </div>
            </div>
        </>
    )
}

export default Events
