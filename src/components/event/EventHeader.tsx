import SiteHeader from "@/components/shell/SiteHeader"
import { testIds } from "@/testIds"

export default function EventHeader() {
    return (
        <SiteHeader
            dataTestId={testIds.event.shellHeader}
            mobileMenuVariant="dropdown"
            sticky={false}
            className="border-b-[3px] border-border"
        />
    )
}
