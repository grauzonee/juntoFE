import assert from "node:assert/strict"
import test from "node:test"
import { normalizeApiDateValue } from "@/requests/utils"

test("normalizeApiDateValue converts unix seconds to an ISO string", () => {
    assert.equal(normalizeApiDateValue(1739212200), "2025-02-10T18:30:00.000Z")
})

test("normalizeApiDateValue also handles numeric strings", () => {
    assert.equal(normalizeApiDateValue("1739212200"), "2025-02-10T18:30:00.000Z")
})

test("normalizeApiDateValue preserves ISO date strings", () => {
    assert.equal(normalizeApiDateValue("2026-03-28T18:30:00.000Z"), "2026-03-28T18:30:00.000Z")
})
