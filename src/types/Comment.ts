export type EventCommentAuthor = {
    id: string
    username: string
    avatarUrl?: string
}

export type EventComment = {
    id: string
    eventId: string
    author: EventCommentAuthor
    content: string
    createdAt: string
}

export type EventCommentList = {
    total: number
    entities: EventComment[]
}
