import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { type Comment } from "@/types/Comment"

type CommentCardProps = {
    comment: Comment
}

function CommentCard({ comment }: CommentCardProps) {
    const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(comment.createdAt));
    return (
        <div className="flex flex-col border-2 border-border shadow-inset p-5 bg-main/50 gap-3">
            <div className="flex flex-row text-main-foreground gap-3 w-full items-center">
                <Avatar className="size-12 border-2 border-background shadow-shadow">
                    <AvatarImage src={comment.author.avatarUrl} />
                </Avatar>
                <div>
                    <p className="font-semibold text-h4 lg:text-base">{comment.author.username}</p>
                    <small className="text-date">{formattedCreatedAt}</small>
                </div>
            </div>
            <p>{comment.content}</p>
        </div >
    )
}

export default CommentCard
