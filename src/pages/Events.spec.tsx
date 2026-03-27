import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import test from "node:test"

test("Events page uses Discover building blocks", () => {
    const source = readFileSync(resolve(process.cwd(), "src/pages/Events.tsx"), "utf-8")

    assert.match(source, /DiscoverFilterBar/)
    assert.match(source, /DiscoverResultsHeader/)
    assert.match(source, /NearMeModal/)
    assert.match(source, /fetchDiscoverEvents/)
    assert.match(source, /setIsNearMeOpen\(true\)/)
})

test("events map route redirects back to discover page", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/events.tsx"), "utf-8")

    assert.match(source, /Navigate to="\/events" replace/)
})

test("near me modal routes found events to the single-event page", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/discover/NearMeModal.tsx"), "utf-8")

    assert.match(source, /navigate\(`\/event\/\$\{eventId\}`\)/)
})
