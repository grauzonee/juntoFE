# Junto Frontend Repo

## Sentry frontend setup

The frontend uses Sentry for runtime error capture, React Router v7 tracing, and production source-map upload.

Required runtime env vars:

- `VITE_SENTRY_DSN`
- `VITE_SENTRY_ENVIRONMENT` or `MODE`
- `VITE_SENTRY_RELEASE` when you want to pin a release name manually
- `VITE_API_BASE_URL` if the API is not running at `http://localhost:3000/api`
- `VITE_SENTRY_TRACE_PROPAGATION_TARGETS` as a comma-separated list of API URLs or hosts

Required build-time env vars for source-map upload:

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_URL` only if you are not using `sentry.io`
