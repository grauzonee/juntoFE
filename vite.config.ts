import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { loadEnv } from "vite"
import { sentryVitePlugin } from "@sentry/vite-plugin"

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "")
    const hasSentryUploadConfig = Boolean(env.SENTRY_AUTH_TOKEN && env.SENTRY_ORG && env.SENTRY_PROJECT)

    return {
        plugins: [
            react(),
            ...(hasSentryUploadConfig
                ? sentryVitePlugin({
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
                })
                : []),
        ],
        build: {
            sourcemap: hasSentryUploadConfig,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, './src')
            }
        },
        server: {
            host: true,
            port: 3000
        }
    }
})
