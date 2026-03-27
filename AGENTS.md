# AGENTS.md

This file is a guide for Codex to understand the project.

## Summary

Frontend part of Junto - an app for creating social events and finding friends. Frontend style is    Neobrutalism.

## Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 3, tailwind-merge, tailwindcss-animate
- **UI Components:** Radix UI (avatar, dialog, popover, select, tabs, navigation-menu, collapsible, separator, label)
- **Forms:** React Hook Form + Zod (v4) validation via @hookform/resolvers
- **HTTP:** Axios
- **Maps:** Leaflet + React Leaflet, leaflet-geosearch, leaflet-control-geocoder
- **Date:** date-fns, react-day-picker
- **Other:** lucide-react (icons), embla-carousel-react, sonner (toasts), react-easy-crop, react-error-boundary, jwt-decode, class-variance-authority, next-themes
- **Linting:** ESLint 9, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh

## External references

Backend part of the app is located here: ~/projects/junto 

Backend is written usung nodejs (TypeScript), express and mongo db. Backend is always source of truth. If there is some endpoint/field missing on the backend, warn me and don't implement any calculation or typical BE logic on the FrontEnd.

## Completing features[!!IMPORTANT, OVERWRITES GLOBAL INSTRUCTION]

After feauture completion, don't automatically commit. When you done writing code, run `npm run lint:fix`, output list of files changed and suggest commit message for my commit.
