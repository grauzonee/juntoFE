# Landing Backend Data Contract

The landing page must not invent product data in the frontend. The backend should expose public, backend-owned data for these landing sections.

## Current Frontend Behavior

- Upcoming events use the existing public `GET /api/event` endpoint with `limit=3`, `page=1`, and `sortByAsc=date`.
- Popular categories are not rendered from fake data because `GET /api/categories` is currently authenticated and does not expose popularity ranking.
- Community stats are not rendered from fake data because no backend-owned stats endpoint exists.

## Required Backend Support

### Featured Events

Expose one of:

- `GET /api/landing/featured-events`
- or a backend-owned `featured` filter/sort on `GET /api/event`

The response should include event fields already used by discover cards: `_id`, `title`, `date`, `fullAddress`, `imageUrl`, `fee`, `type`, and `categories`.

### Popular Categories

Expose a public endpoint such as `GET /api/landing/popular-categories`.

Each category should include:

- `id` or `_id`
- `title`
- backend-computed count or rank label

The backend should own the ranking and count calculation.

### Landing Stats

Expose a public endpoint such as `GET /api/landing/stats`.

The backend should own all aggregate values, including community/member totals, hosted event totals, and city/community totals.
