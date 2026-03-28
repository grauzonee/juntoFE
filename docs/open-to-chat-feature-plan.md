# Open To Chat Feature Plan

## Summary

`Open to chat` is an in-event social comfort feature for attendees who have already arrived but do not know who to talk to.

The user opts in privately, adds a lightweight conversation preference, and waits for a mutual match with another attendee who is also open to chatting. When a match is found, Junto opens a temporary event-scoped conversation with an icebreaker and simple guidance that helps both people find each other in the venue.

This is not a dating feature. It should be positioned as a friend-making and inclusion feature for solo attendees, shy users, newcomers, and anyone who wants help starting a conversation.

## Problem

Junto already supports event discovery, profiles, RSVPs, and event pages. The missing moment is what happens after the attendee actually shows up.

Current pain points:

- Solo attendees can arrive and still feel awkward or isolated.
- Users may leave early even if the event itself is good.
- Junto currently helps people get to the event, but not necessarily connect once they are there.

If Junto solves the first 5 to 10 minutes of social friction, users are more likely to feel that the platform personally helped them make a real connection.

## Product Goals

- Help attendees start one real conversation with low pressure.
- Reduce anxiety for solo and first-time attendees.
- Increase the chance that users form repeat social bonds through Junto.
- Make Junto feel more caring and socially intelligent than Meetup.

## Non-Goals For MVP

- Group chat matching.
- Complex recommendation or ranking logic on the frontend.
- Precise indoor location tracking.
- Permanent messaging by default.
- Dating-oriented discovery or flirting mechanics.

## Core Experience

### Entry Point

Show the feature only when it makes sense:

- user is authenticated
- user has RSVP'd or is otherwise confirmed as an attendee
- event is currently active or close to start

Possible CTA labels:

- `Open to chat`
- `Find someone to talk to`
- `I’m open to chatting`

Recommended MVP label: `Open to chat`

### Opt-In Flow

When the user taps the CTA, show a compact dialog or bottom sheet:

- short explanation: "We’ll only match you with another attendee who also opted in."
- optional vibe tag
- optional note about where they are standing
- confirm button

Suggested vibe tags:

- `new here`
- `came solo`
- `quick hello`
- `same interests`
- `easy small talk`

Keep selection optional. The flow should still work with one tap.

### Match Found

When a mutual match exists:

- create a temporary 1:1 event conversation
- show a system opener
- show shared context if available
- help users find each other in a soft way

Examples of system-generated opener content:

- "You’re both open to chatting at this event."
- "You both picked `came solo`."
- "Try asking: What made you come tonight?"

Soft location prompts:

- "Share where you’re standing."
- "Tell them what you’re wearing."
- "Say if you’re near the entrance, bar, or check-in."

### End Of Match

After the users confirm they met, or after the temporary chat expires:

- ask whether they want to stay connected
- offer a simple follow-up action later, not immediately overload the screen

Possible post-match actions:

- `Stay connected`
- `See each other again at another event`
- `Not now`

## User Stories

- As a solo attendee, I want a low-pressure way to meet one person so I do not feel awkward arriving alone.
- As a shy attendee, I want mutual opt-in before a chat starts so I feel safe and not approached unexpectedly.
- As a newcomer, I want a prompt or icebreaker so I do not have to invent the opening message myself.
- As an event host, I want this feature to help attendees connect without creating spam or making the event feel like a dating app.
- As a user, I want to stop matching instantly if I change my mind.

## UX Principles

- Private by default.
- Mutual opt-in only.
- Fast enough to use while standing in a real venue.
- Warm and human, not gamified.
- Easy to exit at any time.
- Temporary by default unless both people choose to continue.

## Suggested States

### 1. Idle

User sees CTA on the event page.

### 2. Opted In

User is waiting for a match.

Show:

- current status
- selected vibe tag
- `pause matching`
- `cancel`

### 3. Matched

User has a temporary conversation room with one attendee.

Show:

- avatar and first name or username
- shared context
- system icebreaker
- time-limited status
- `we found each other`
- `leave chat`

### 4. Completed

The pair confirms they connected or the chat ends.

Show:

- quick reflection
- optional stay-connected action

### 5. Closed / Expired

The user opts out, leaves the event, or the temporary chat expires.

## Matching Rules

These rules must come from the backend. Frontend should only reflect backend state.

Recommended MVP rules:

- only attendees of the same active event can match
- only one active `open to chat` request per user per event
- only one active temporary match at a time
- mutual opt-in only
- block and report lists must be respected
- recently declined or closed pairs should not immediately rematch
- host-defined event settings can disable this feature

Recommended backend-side prioritization later:

- prioritize users who came solo
- prioritize users with shared interests or compatible vibe tags
- avoid repeated matching with the same person too often

## Backend Contracts To Confirm

Backend is the source of truth. Frontend should not implement local fallback matching logic.

Needed entities or equivalents:

- `open_to_chat_session`
- `open_to_chat_request`
- `open_to_chat_match`
- `event_temporary_conversation`

Suggested request payloads:

### Create / update opt-in

`POST /event/:id/open-to-chat`

Body example:

```json
{
  "status": "active",
  "vibeTag": "came_solo",
  "locationHint": "near the entrance"
}
```

### Pause or cancel opt-in

`PATCH /event/:id/open-to-chat`

Body example:

```json
{
  "status": "paused"
}
```

or

```json
{
  "status": "cancelled"
}
```

### Poll or subscribe to current state

Choose one real approach on the backend:

- `GET /event/:id/open-to-chat`
- websocket events
- server-sent events

Frontend should not fake live matching if the backend cannot support real-time or near-real-time updates.

### Match response shape

Example only:

```json
{
  "status": "matched",
  "matchId": "match_123",
  "conversationId": "conv_123",
  "expiresAt": "2026-03-26T18:20:00.000Z",
  "partner": {
    "id": "user_2",
    "username": "Alex",
    "avatarUrl": "https://..."
  },
  "sharedContext": {
    "vibeTags": ["came_solo"],
    "sharedInterests": ["design", "live music"]
  },
  "suggestedPrompt": "What made you come tonight?"
}
```

### Match completion

Suggested actions:

- `POST /event/:id/open-to-chat/:matchId/met`
- `POST /event/:id/open-to-chat/:matchId/close`
- `POST /event/:id/open-to-chat/:matchId/report`
- `POST /event/:id/open-to-chat/:matchId/block`

If the backend does not expose these capabilities, stop at the UI state that is supported and do not simulate the rest locally.

## Frontend Scope

### Phase 1: MVP

- Add CTA to the event page for eligible attendees.
- Build opt-in dialog or panel.
- Add waiting state.
- Add matched state UI.
- Add temporary conversation shell.
- Add pause, cancel, met, leave, report, and block actions if backend supports them.
- Add toasts and error handling.

Likely frontend areas:

- event RSVP / attendee context
- event page CTA placement
- temporary conversation UI
- request helpers in `src/requests/`
- new types in `src/types/`

### Phase 2: Better Matching

- richer vibe tags
- host controls
- better mutual context
- follow-up connection prompt after successful chat

### Phase 3: Retention Loop

- show successful connections in event recap
- allow both users to reconnect after the event
- connect with future friend-making features

## Suggested Frontend Information Architecture

### Event Page

Add a new card near RSVP / discussion area:

- primary CTA: `Open to chat`
- short trust copy
- visible only for eligible attendees

### Temporary Conversation

Use a lightweight event-scoped chat surface, not the full long-term messaging product unless that already exists in backend.

Sections:

- partner header
- context badges
- system opener
- message list
- composer
- safety actions

### Profile / History

Not required for MVP, but later a user could see:

- number of successful event connections
- people they chose to stay connected with

Do not add this without backend support and consent rules.

## Safety And Trust

This feature needs clear guardrails.

Required:

- mutual opt-in only
- block
- report
- quick exit
- no public attendee ranking
- no visible "who is available" list in MVP

Recommended:

- cooldown after closing a match
- no rematch with blocked or reported users
- temporary chat auto-expiration
- clear copy that the feature is for friendly conversation and inclusion

## Copy Direction

Tone should feel supportive, not transactional.

Examples:

- "Want help starting a conversation?"
- "We’ll match you with another attendee who’s also open to chatting."
- "Private, mutual, and easy to leave anytime."
- "You’re both here solo. Try saying hi and asking what brought them here."

Avoid:

- "Vote"
- "Hot match"
- "Available people nearby"
- anything that feels like swiping or dating

## Metrics

Track at least:

- opt-in rate
- match rate
- time from opt-in to match
- chat started rate
- "we found each other" completion rate
- stay-connected rate
- report / block rate
- return attendance after using the feature

Primary success signal:

- users who used `Open to chat` are more likely to attend another event within 30 days

## Risks

- Users may misread it as a dating feature.
- Matching could feel too slow if there are too few active attendees.
- Without strong safety controls, trust can drop quickly.
- If the backend does not support real-time updates, the experience may feel broken.

## Rollout Recommendation

1. Build for one active event format first.
2. Limit to 1:1 temporary matching.
3. Use simple vibe tags.
4. Launch behind a feature flag.
5. Test with events that already attract solo attendees or newcomer-friendly communities.

## MVP Checklist

- Confirm attendee eligibility rules with backend.
- Confirm live state transport: polling, SSE, or websocket.
- Confirm temporary conversation model.
- Confirm moderation actions.
- Add event page CTA and opt-in UI.
- Add waiting and matched states.
- Add temporary conversation UI.
- Add analytics events.
- Add feature flag.
- Test empty, loading, matched, expired, blocked, and error states.

## Recommendation

This is worth building because it addresses a high-emotion moment that generic event platforms usually leave unresolved.

For Junto, the best MVP is:

- one private opt-in button
- one optional vibe tag
- one temporary 1:1 match
- one icebreaker
- one clear way to confirm "we met"

That version is small enough to ship, easy to explain, and strong enough to make users feel that Junto helped them belong in the room.
