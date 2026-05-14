import { Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BrutalButton from "@/components/ui/brutal-button"
import { Button } from "@/components/ui/button"
import { formatCommentTimestamp, getUserInitials } from "@/components/event/event-utils"
import { testIds } from "@/testIds"
import type { EventComment } from "@/types/Comment"

type CommentListProps = Readonly<{
    comments: EventComment[]
    total: number
    loading: boolean
    loadingMore: boolean
    error: string | null
    currentUserId: string | null
    deletingId: string | null
    onDelete: (commentId: string) => void
    onLoadMore: () => void
}>

type CommentRowProps = Readonly<{
    comment: EventComment
    currentUserId: string | null
    deletingId: string | null
    onDelete: (commentId: string) => void
}>

function CommentRow({
    comment,
    currentUserId,
    deletingId,
    onDelete,
}: CommentRowProps) {
    const isAuthor = currentUserId === comment.author.id
    const isDeleting = deletingId === comment.id

    return (
        <article
            data-testid={testIds.event.commentItem(comment.id)}
            className="border-2 border-border bg-card px-4 py-4 shadow-brutal-sm"
        >
            <div className="flex items-start gap-3">
                <Avatar className="h-11 w-11 border-2 border-border bg-mint-light">
                    <AvatarImage src={comment.author.avatarUrl} alt={comment.author.username} className="object-cover" />
                    <AvatarFallback className="bg-card font-display text-sm font-extrabold">
                        {getUserInitials(comment.author.username)}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-extrabold">{comment.author.username}</p>
                            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/55">
                                {formatCommentTimestamp(comment.createdAt)}
                            </p>
                        </div>
                        {isAuthor ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                data-testid={testIds.event.commentDeleteButton(comment.id)}
                                className="h-auto rounded-none border-2 border-transparent px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/60 hover:border-border hover:bg-mint-light hover:text-foreground"
                                onClick={() => onDelete(comment.id)}
                                disabled={isDeleting}
                            >
                                <Trash2 />
                                {isDeleting ? "Deleting" : "Delete"}
                            </Button>
                        ) : null}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-foreground/80">{comment.content}</p>
                </div>
            </div>
        </article>
    )
}

export default function CommentList({
    comments,
    total,
    loading,
    loadingMore,
    error,
    currentUserId,
    deletingId,
    onDelete,
    onLoadMore,
}: CommentListProps) {
    const hasComments = comments.length > 0
    const hasMoreComments = comments.length < total
    let content: React.ReactNode

    if (loading) {
        content = (
            <div className="border-2 border-border bg-card px-5 py-6 text-center shadow-brutal-sm">
                <p className="text-sm font-bold text-foreground/70">Loading comments...</p>
            </div>
        )
    } else if (error) {
        content = (
            <div className="border-2 border-border bg-[#FFD9D9] px-5 py-6 text-center shadow-brutal-sm">
                <p className="text-sm font-bold text-foreground">{error}</p>
            </div>
        )
    } else if (hasComments) {
        content = (
            <div data-testid={testIds.event.commentsList} className="space-y-3">
                {comments.map((comment) => (
                    <CommentRow
                        key={comment.id}
                        comment={comment}
                        currentUserId={currentUserId}
                        deletingId={deletingId}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        )
    } else {
        content = (
            <div className="border-2 border-border bg-card px-5 py-6 text-center shadow-brutal-sm">
                <p className="text-sm font-bold text-foreground">No comments yet.</p>
                <p className="mt-2 text-sm leading-7 text-foreground/75">
                    Start the thread with a quick question or note for the host.
                </p>
            </div>
        )
    }

    return (
        <>
            {content}

            {hasMoreComments ? (
                <BrutalButton
                    type="button"
                    tone="cream"
                    data-testid={testIds.event.commentsLoadMoreButton}
                    className="w-full"
                    onClick={onLoadMore}
                    disabled={loadingMore}
                >
                    {loadingMore ? "Loading..." : "Load more comments"}
                </BrutalButton>
            ) : null}
        </>
    )
}
