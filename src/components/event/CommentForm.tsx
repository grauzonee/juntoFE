import type { FormEvent } from "react"
import { Link } from "react-router"
import BrutalButton from "@/components/ui/brutal-button"
import { Textarea } from "@/components/ui/textarea"
import { testIds } from "@/testIds"

type CommentFormProps = Readonly<{
    canComment: boolean
    content: string
    maxCommentLength: number
    submitting: boolean
    onContentChange: (value: string) => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}>

export default function CommentForm({
    canComment,
    content,
    maxCommentLength,
    submitting,
    onContentChange,
    onSubmit,
}: CommentFormProps) {
    if (!canComment) {
        return (
            <div className="border-2 border-border bg-mint-light px-5 py-5 shadow-brutal-sm">
                <p className="text-sm font-bold text-foreground">Join the conversation.</p>
                <p className="mt-2 text-sm leading-7 text-foreground/75">
                    Sign in to ask questions, coordinate plans, and follow the event thread.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <BrutalButton asChild tone="mint" className="w-full sm:w-auto">
                        <Link to="/login">Log in</Link>
                    </BrutalButton>
                    <BrutalButton asChild tone="cream" className="w-full sm:w-auto">
                        <Link to="/register">Create account</Link>
                    </BrutalButton>
                </div>
            </div>
        )
    }

    const remainingCharacters = maxCommentLength - content.length

    return (
        <form data-testid={testIds.event.commentForm} className="space-y-3" onSubmit={onSubmit}>
            <Textarea
                data-testid={testIds.event.commentTextarea}
                name="content"
                value={content}
                maxLength={maxCommentLength}
                placeholder="Ask a question, share a plan, or let people know you're coming."
                onChange={(event) => onContentChange(event.target.value)}
                disabled={submitting}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/55">
                    {remainingCharacters} characters left
                </p>
                <BrutalButton
                    type="submit"
                    tone="mint"
                    className="w-full sm:w-auto"
                    disabled={submitting || !content.trim()}
                >
                    {submitting ? "Posting..." : "Post comment"}
                </BrutalButton>
            </div>
        </form>
    )
}
