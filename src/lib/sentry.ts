import * as Sentry from "@sentry/react"
import { useEffect } from "react"
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from "react-router"
import {
    sentryDsn,
    sentryEnvironment,
    sentryRelease,
    sentryTracePropagationTargets,
} from "@/lib/runtime"

const sensitiveKeyPatterns = [
    /authorization/i,
    /cookie/i,
    /secret/i,
    /token/i,
    /password/i,
]

function isSensitiveKey(key: string) {
    return sensitiveKeyPatterns.some(pattern => pattern.test(key))
}

function scrubValue<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map(item => scrubValue(item)) as T
    }

    if (!value || typeof value !== "object") {
        return value
    }

    const entries = Object.entries(value as Record<string, unknown>)

    return entries.reduce<Record<string, unknown>>((accumulator, [key, currentValue]) => {
        accumulator[key] = isSensitiveKey(key) ? "[redacted]" : scrubValue(currentValue)
        return accumulator
    }, {}) as T
}

export function initSentry() {
    if (!sentryDsn) {
        return
    }

    Sentry.init({
        dsn: sentryDsn,
        environment: sentryEnvironment,
        release: sentryRelease,
        sendDefaultPii: false,
        tracePropagationTargets: sentryTracePropagationTargets,
        tracesSampleRate: 0.05,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 1,
        integrations: [
            Sentry.reactRouterV7BrowserTracingIntegration({
                useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromChildren,
                matchRoutes,
            }),
            Sentry.replayIntegration(),
        ],
        beforeSend(event) {
            if (event.request) {
                event.request = scrubValue(event.request)
            }

            if (event.contexts) {
                event.contexts = scrubValue(event.contexts)
            }

            if (event.extra) {
                event.extra = scrubValue(event.extra)
            }

            if (event.breadcrumbs) {
                event.breadcrumbs = event.breadcrumbs.map(breadcrumb => ({
                    ...breadcrumb,
                    data: breadcrumb.data ? scrubValue(breadcrumb.data) : breadcrumb.data,
                }))
            }

            return event
        },
    })
}

export function createReactRootErrorHandlers() {
    return {
        onCaughtError: Sentry.reactErrorHandler(),
        onUncaughtError: Sentry.reactErrorHandler(),
        onRecoverableError: Sentry.reactErrorHandler(),
    }
}
