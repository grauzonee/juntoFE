import { api as axios } from "@/lib/axios"
import { makeRequest, normalizeApiDateValue } from "@/requests/utils"
import type { EventComment, EventCommentAuthor, EventCommentList } from "@/types/Comment"

type RawEventCommentAuthor = {
    id?: string
    _id?: string
    username: string
    avatarUrl?: string
}

type RawEventComment = {
    id?: string
    _id?: string
    event: string
    author: RawEventCommentAuthor
    content: string
    createdAt: string
}

type RawEventCommentList = {
    total: number
    entities: RawEventComment[]
}

type CreateEventCommentPayload = {
    eventId: string
    content: string
}

type FetchEventCommentsOptions = {
    offset?: number
    limit?: number
}

function normalizeCommentAuthor(author: RawEventCommentAuthor): EventCommentAuthor {
    return {
        id: author.id ?? author._id ?? "",
        username: author.username,
        avatarUrl: author.avatarUrl,
    }
}

function normalizeComment(comment: RawEventComment): EventComment {
    return {
        id: comment.id ?? comment._id ?? "",
        eventId: comment.event,
        author: normalizeCommentAuthor(comment.author),
        content: comment.content,
        createdAt: normalizeApiDateValue(comment.createdAt),
    }
}

export async function fetchEventComments(
    eventId: string,
    { offset = 0, limit = 10 }: FetchEventCommentsOptions = {},
): Promise<EventCommentList> {
    const response = await makeRequest<{ success: boolean; data: RawEventCommentList }>(
        () => axios.get(`/comments/${eventId}`, { params: { offset, limit } }),
        "comment",
    )

    return {
        total: response.data.total,
        entities: response.data.entities.map(normalizeComment),
    }
}

export async function createEventComment(payload: CreateEventCommentPayload): Promise<EventComment> {
    const response = await makeRequest<{ success: boolean; data: RawEventComment }>(
        () => axios.post("/comments", payload),
        "comment",
    )

    return normalizeComment(response.data)
}

export async function deleteEventComment(commentId: string): Promise<{ message: string }> {
    const response = await makeRequest<{ success: boolean; data: { message: string } }>(
        () => axios.delete(`/comments/${commentId}`),
        "comment",
    )

    return response.data
}
