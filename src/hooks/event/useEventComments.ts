import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { createEventComment, deleteEventComment, fetchEventComments } from "@/requests/comment"
import type { EventComment } from "@/types/Comment"

const COMMENTS_PAGE_SIZE = 10

type UseEventCommentsValue = {
    comments: EventComment[]
    total: number
    loading: boolean
    loadingMore: boolean
    submitting: boolean
    deletingId: string | null
    error: string | null
    content: string
    setContent: (value: string) => void
    submitComment: () => Promise<void>
    deleteComment: (commentId: string) => Promise<void>
    loadMoreComments: () => Promise<void>
}

function getErrorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback
}

export function useEventComments(eventId: string): UseEventCommentsValue {
    const [comments, setComments] = useState<EventComment[]>([])
    const [total, setTotal] = useState(0)
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const requestIdRef = useRef(0)

    useEffect(() => {
        requestIdRef.current += 1
        const requestId = requestIdRef.current
        let active = true

        setLoading(true)
        setError(null)

        fetchEventComments(eventId, { offset: 0, limit: COMMENTS_PAGE_SIZE })
            .then((result) => {
                if (!active || requestIdRef.current !== requestId) {
                    return
                }

                setComments(result.entities)
                setTotal(result.total)
            })
            .catch((nextError: unknown) => {
                if (!active || requestIdRef.current !== requestId) {
                    return
                }

                setError(getErrorMessage(nextError, "Could not load comments."))
                setComments([])
                setTotal(0)
            })
            .finally(() => {
                if (active && requestIdRef.current === requestId) {
                    setLoading(false)
                }
            })

        return () => {
            active = false
        }
    }, [eventId])

    const submitComment = useCallback(async () => {
        const trimmedContent = content.trim()

        if (!trimmedContent) {
            return
        }

        setSubmitting(true)

        try {
            const createdComment = await createEventComment({
                eventId,
                content: trimmedContent,
            })

            setComments((currentComments) => [createdComment, ...currentComments])
            setTotal((currentTotal) => currentTotal + 1)
            setContent("")
            toast("Comment posted.")
        } catch (submitError) {
            toast(getErrorMessage(submitError, "Could not post comment."))
        } finally {
            setSubmitting(false)
        }
    }, [content, eventId])

    const deleteComment = useCallback(async (commentId: string) => {
        setDeletingId(commentId)

        try {
            const response = await deleteEventComment(commentId)

            setComments((currentComments) => currentComments.filter((comment) => comment.id !== commentId))
            setTotal((currentTotal) => Math.max(0, currentTotal - 1))
            toast(response.message)
        } catch (deleteError) {
            toast(getErrorMessage(deleteError, "Could not delete comment."))
        } finally {
            setDeletingId(null)
        }
    }, [])

    const loadMoreComments = useCallback(async () => {
        setLoadingMore(true)

        try {
            const result = await fetchEventComments(eventId, {
                offset: comments.length,
                limit: COMMENTS_PAGE_SIZE,
            })

            setComments((currentComments) => {
                const seenCommentIds = new Set(currentComments.map((comment) => comment.id))
                const nextComments = result.entities.filter((comment) => !seenCommentIds.has(comment.id))

                return [...currentComments, ...nextComments]
            })
            setTotal(result.total)
        } catch (loadMoreError) {
            toast(getErrorMessage(loadMoreError, "Could not load more comments."))
        } finally {
            setLoadingMore(false)
        }
    }, [comments.length, eventId])

    return {
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
    }
}
