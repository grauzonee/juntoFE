import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import CommentCard from "@/components/comment/CommentCard";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { comment } from "@/data"

function Discussion() {
    return (
        <Card>
            <CardHeader>
                <h3>Discussion</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col items-end gap-2">
                    <Textarea className="" placeholder="What do you think?" />
                    <Button className="md:w-1/5 w-full" variant='noShadow'>Send</Button>
                </div>

                <div className="flex flex-col gap-2">
                    <CommentCard comment={comment} />
                    <CommentCard comment={comment} />
                    <Button variant='link'>Read more</Button>
                </div>
            </CardContent>
        </Card>

    )
}

export default Discussion;
