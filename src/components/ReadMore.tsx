import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import React, { useState } from "react"
import { Button } from "@/components/ui/button";

type ReadMoreProps = React.ComponentProps<'div'> & {
    text: string;
}

function ReadMore({ text, className }: ReadMoreProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className={className}>
            <div>
                <CollapsibleTrigger>
                    <div className="relative">
                        <p className="text-start">{text.substring(0, 250)}...</p>
                        {!isExpanded && <Button className="h-5" variant={'link'}>Read more</Button>}
                    </div>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <p>{text}</p>
                {isExpanded && <Button className="h-5" variant={'link'} onClick={() => setIsExpanded(false)}>Read less</Button>}
            </CollapsibleContent>
        </Collapsible>
    )
}
export default ReadMore
