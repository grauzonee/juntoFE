import { Link } from "react-router"

type FooterLinkItem =
    | { label: string; href: string; to?: never }
    | { label: string; to: string; href?: never }

type SiteFooterProps = {
    label: string
    links: FooterLinkItem[]
    dataTestId?: string
}

const footerLinkClassName = "transition-colors hover:text-violet"

export default function SiteFooter({ label, links, dataTestId }: SiteFooterProps) {
    return (
        <footer
            data-testid={dataTestId}
            className="border-t-brutal border-border bg-cream px-4 py-6 md:px-6"
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">{label}</p>
                <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-foreground/75 md:justify-end">
                    {links.map((link) => renderFooterLink(link))}
                </div>
            </div>
        </footer>
    )
}

function renderFooterLink(link: FooterLinkItem) {
    if ("href" in link) {
        return (
            <a key={link.href} href={link.href} className={footerLinkClassName}>
                {link.label}
            </a>
        )
    }

    return (
        <Link key={link.to} to={link.to} className={footerLinkClassName}>
            {link.label}
        </Link>
    )
}
