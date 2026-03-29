import assert from "node:assert/strict"
import test from "node:test"
import { AxiosError } from "axios"
import { makeRequest, normalizeApiDateValue } from "@/requests/utils"

test("normalizeApiDateValue converts unix seconds to an ISO string", () => {
    assert.equal(normalizeApiDateValue(1739212200), "2025-02-10T18:30:00.000Z")
})

test("normalizeApiDateValue also handles numeric strings", () => {
    assert.equal(normalizeApiDateValue("1739212200"), "2025-02-10T18:30:00.000Z")
})

test("normalizeApiDateValue preserves ISO date strings", () => {
    assert.equal(normalizeApiDateValue("2026-03-28T18:30:00.000Z"), "2026-03-28T18:30:00.000Z")
})

test("makeRequest returns a friendly message for 500 responses", async () => {
    await assert.rejects(
        () =>
            makeRequest(
                () =>
                    Promise.reject(
                        new AxiosError("boom", undefined, undefined, undefined, {
                            status: 500,
                            statusText: "Server error",
                            headers: {},
                            config: { headers: {} as never },
                            data: {},
                        }),
                    ),
                "events",
            ),
        /Oops, something happened on our server!/,
    )
})

test("makeRequest returns a friendly message when axios has no response status", async () => {
    await assert.rejects(
        () => makeRequest(() => Promise.reject(new AxiosError("boom")), "events"),
        /Oops, something happened on our server!/,
    )
})
