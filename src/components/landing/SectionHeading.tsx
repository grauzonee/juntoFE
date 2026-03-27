interface SectionHeadingProps {
    eyebrow: string
    actionLabel?: string
    actionHref?: string
}

export default function SectionHeading({ eyebrow, actionLabel, actionHref }: SectionHeadingProps) {
    return (
        <div className="mb-6 flex items-center justify-between gap-4 border-b-[3px] border-border pb-3 text-xs font-bold uppercase tracking-[0.22em] text-foreground">
            <span className="font-mono">{eyebrow}</span>
            {actionLabel && actionHref ? (
                <a
                    href={actionHref}
                    className="font-heading text-sm normal-case tracking-normal text-violet transition-colors hover:text-mint"
                >
                    {actionLabel}
                </a>
            ) : null}
        </div>
    )
}
