import DiscoverEventCard from "@/components/discover/DiscoverEventCard"
import {
    getDiscoverCategoryTitles,
    getDiscoverTypeTitle,
} from "@/components/discover/discover-utils"
import { useDiscoverMobileSnapScroll } from "@/hooks/event/useDiscoverMobileSnapScroll"
import { testIds } from "@/testIds"
import type { DiscoverEvent } from "@/types/discover"

type DiscoverEventListProps = {
    events: DiscoverEvent[]
    snapScrollEnabled: boolean
}

export default function DiscoverEventList({
    events,
    snapScrollEnabled,
}: Readonly<DiscoverEventListProps>) {
    const { registerEventCard } = useDiscoverMobileSnapScroll({
        enabled: snapScrollEnabled,
        events,
    })

    return (
        <div
            data-testid={testIds.discover.resultsList}
            className="flex flex-col gap-4"
        >
            {events.map((event) => (
                <div
                    key={event._id}
                    ref={registerEventCard(event._id)}
                >
                    <DiscoverEventCard
                        event={event}
                        view="list"
                        typeTitle={getDiscoverTypeTitle(event)}
                        categoryTitles={getDiscoverCategoryTitles(event)}
                    />
                </div>
            ))}
        </div>
    )
}
