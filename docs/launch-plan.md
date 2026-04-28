# Junto Launch Plan

This document captures what must be true before Junto is ready to launch, based on the current frontend and backend state.

## Launch Definition

Junto is ready to launch when anonymous users can discover events, logged-in users can create and manage events, attendees can join and cancel attendance, and the product is stable enough for real desktop and responsive use.

## Must Be True For Launch

### Access And Authentication

- Anonymous users can browse events and event detail pages.
- Users can register, log in, stay authenticated, and log out cleanly.
- Auth errors are handled clearly and do not leave the app in a broken state.

### Discovery

- Event discovery works for anonymous and logged-in users.
- Discovery supports:
  - search
  - event type filter
  - category filter
  - date filter
  - sorting
  - pagination
- Event detail pages are available from discovery results.
- Seeded category, event type, and interest data exists in production.

### Events

- Any logged-in user can create events.
- Event creation requires image upload.
- Event creation supports multiple categories.
- Event max attendees is optional and uses the backend default.
- Events are free for MVP.
- Event owners can edit their events.
- Event owners can delete their events.
- Deleted events and related RSVPs are hidden, using the existing backend behavior.
- Events use exact addresses.

### Attendance

- Logged-in users can attend events.
- Logged-in users can cancel attendance.
- Guests can see attendee count only.
- Guests cannot see attendee identities.
- Guest attendee section says something like: "Log in to see attendees."
- Logged-in users can see attendee lists for all events.

### Profiles

- Public user profile pages exist.
- Public profiles show only basic user info for MVP.
- The current user's profile page exists and works for core profile info.
- Profile event tabs can be hidden for MVP.

### Support And Safety

- Support path exists as an email link.
- Placeholder support email is acceptable for now.
- Anyone with an account can create events for MVP.
- Full moderation/reporting system is post-launch.

### UX And Production

- Desktop experience is polished.
- Responsive layouts are usable.
- Production API URL is configurable and not hardcoded to localhost.
- Production upload/media URLs work.
- Production deploy, env vars, seed process, health check, and rollback path are clear.

## Launch Blockers

### Frontend / Backend Contract

- Fix frontend event types endpoint mismatch:
  - frontend currently calls `/eventtypes`
  - backend exposes `/event/types`
- Decide and implement public category access for anonymous discovery.
- Confirm public event type access for anonymous discovery.
- Align event create/edit frontend payload with backend contract.

### Frontend Implementation

- Replace hardcoded localhost API URL with environment-based config.
- Build and wire create event flow.
- Build and wire edit event flow.
- Build and wire delete event flow.
- Build cancel attendance flow.
- Build attendee list UI with guest privacy behavior.
- Build public basic profile page.
- Hide or wire profile event tabs.
- Add support email link.
- Fix `/profile/edit` route loader typo.

### Backend / API

- Verify event owner authorization for edit/delete.
- Verify attendee list endpoint supports required privacy behavior.
- Verify deleted events and RSVPs stay hidden.
- Verify seeders are production-safe for categories, event types, and interests.
- Confirm media upload paths and returned URLs work in production.

### QA

- Test anonymous discovery.
- Test logged-in discovery.
- Test registration and login.
- Test event creation with image upload.
- Test event edit and delete by owner.
- Test edit/delete blocked for non-owner.
- Test attend and cancel attendance.
- Test guest attendee count behavior.
- Test logged-in attendee list behavior.
- Test public profile page.
- Test desktop and responsive layouts.

## Need To Decide

- Placeholder support email value.
- Final launch date target.
- Production frontend domain.
- Production backend/API host.
- Production upload/media hosting approach.
- Seed data ownership and refresh process.
- Exact copy for guest attendee prompt.
- Who signs off on launch readiness.

## Owners Needed

- Frontend owner for create/edit/delete event flows.
- Frontend owner for attendee list and profile pages.
- Backend owner for public discovery contracts.
- Backend owner for attendee privacy and event ownership rules.
- Product owner for launch scope cuts.
- UX owner for desktop and responsive polish.
- Ops owner for env vars, deploy, seeds, uploads, and support email.

## Can Wait Until After Launch

- Near-me flow.
- Paid events.
- Admin panel.
- Full moderation and reporting system.
- Event edit notifications.
- Public profile event history.
- Profile event tabs.
- Advanced public profile content.

## Current Code Signals

- Frontend calls `/eventtypes`, while backend exposes `/event/types`.
- Backend currently protects `/categories` with auth, but anonymous discovery needs categories.
- Frontend API base URL is hardcoded to `http://localhost:3000/api`.
- Profile event request helpers currently return empty arrays.
- Profile event tab UI currently uses mock data.
- `/profile/edit` route uses `loadeer` instead of `loader`.
- Event create/edit frontend flow needs to be built or fully wired.

