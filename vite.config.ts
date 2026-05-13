import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "")
    const hasSentryUploadConfig = Boolean(env.SENTRY_AUTH_TOKEN && env.SENTRY_ORG && env.SENTRY_PROJECT)
    const plugins = [react()]

    if (hasSentryUploadConfig) {
        const { sentryVitePlugin } = await import("@sentry/vite-plugin")

        plugins.push(
            sentryVitePlugin({
                org: env.SENTRY_ORG,
                project: env.SENTRY_PROJECT,
                authToken: env.SENTRY_AUTH_TOKEN,
                url: env.SENTRY_URL,
                release: {
                    name: env.VITE_SENTRY_RELEASE,
                    inject: true,
                    create: true,
                    finalize: true,
                },
                sourcemaps: {
                    filesToDeleteAfterUpload: "dist/**/*.map",
                },
            }),
        )
    }

    return {
        plugins,
        build: {
            sourcemap: hasSentryUploadConfig,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            host: true,
            port: 3000,
        },
    }
})
