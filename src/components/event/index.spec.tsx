import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import test from "node:test"

test("single event page is composed from modular event sections", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/event/EventPage.tsx"), "utf-8")

    assert.match(source, /EventHero/)
    assert.match(source, /EventAboutSection/)
    assert.match(source, /EventMeetingPointSection/)
    assert.match(source, /EventDiscussionSection/)
    assert.match(source, /EventRsvpCard/)
    assert.match(source, /EventHostCard/)
})

test("single event route uses the dedicated event layout", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/index.tsx"), "utf-8")

    assert.match(source, /EventLayout/)
    assert.match(source, /path: 'event\/:id'/)
})
