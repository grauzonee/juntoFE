type RuntimeEnv = ImportMetaEnv & {
    readonly MODE?: string
}

function getRuntimeEnv(): RuntimeEnv {
    const meta = import.meta as ImportMeta & { env?: RuntimeEnv }

    return meta.env ?? {}
}

function parseCsv(value: string | undefined): string[] | undefined {
    if (!value) {
        return undefined
    }

    const parsed = value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)

    return parsed.length > 0 ? parsed : undefined
}

const env = getRuntimeEnv()

export const apiBaseUrl = env.VITE_API_BASE_URL ?? "http://localhost:3000/api"
export const sentryDsn = env.VITE_SENTRY_DSN
export const sentryEnvironment = env.VITE_SENTRY_ENVIRONMENT ?? env.MODE ?? "development"
export const sentryRelease = env.VITE_SENTRY_RELEASE
export const sentryTracePropagationTargets = parseCsv(env.VITE_SENTRY_TRACE_PROPAGATION_TARGETS) ?? [apiBaseUrl]
