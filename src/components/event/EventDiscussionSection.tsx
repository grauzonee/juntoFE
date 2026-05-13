import { type FormEvent, useContext } from "react"
import { UserContext } from "@/contexts/UserContext"
import { getBearerToken } from "@/lib/axios"
import CommentForm from "@/components/event/CommentForm"
import CommentList from "@/components/event/CommentList"
import EventSectionHeading from "@/components/event/EventSectionHeading"
import { useEventComments } from "@/hooks/event/useEventComments"
import { testIds } from "@/testIds"
import WindowCard from "@/components/ui/window-card"

const MAX_COMMENT_LENGTH = 500

type EventDiscussionSectionProps = {
    eventId: string
}

function getCurrentUserId(user: { id?: string; _id?: string } | null) {
    return user?.id ?? user?._id ?? null
}

export default function EventDiscussionSection({ eventId }: EventDiscussionSectionProps) {
    const { user } = useContext(UserContext)
    const currentUserId = getCurrentUserId(user)
    const canComment = Boolean(getBearerToken())
    const {
        comments,
        total,
        loading,
        loadingMore,
        submitting,
        deletingId,
        error,
        content,
        setContent,
        submitComment,
        deleteComment,
        loadMoreComments,
    } = useEventComments(eventId)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await submitComment()
    }

    return (
        <WindowCard
            data-testid={testIds.event.discussionSection}
            className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
        >
            <div className="p-5 md:p-7">
                <EventSectionHeading label="Discussion" meta={`${total} comment${total === 1 ? "" : "s"}`} />
                <div className="space-y-5">
                    <CommentForm
                        canComment={canComment}
                        content={content}
                        maxCommentLength={MAX_COMMENT_LENGTH}
                        submitting={submitting}
                        onContentChange={setContent}
                        onSubmit={handleSubmit}
                    />
                    <CommentList
                        comments={comments}
                        total={total}
                        loading={loading}
                        loadingMore={loadingMore}
                        error={error}
                        currentUserId={currentUserId}
                        deletingId={deletingId}
                        onDelete={deleteComment}
                        onLoadMore={loadMoreComments}
                    />
                </div>
            </div>
        </WindowCard>
    )
}
