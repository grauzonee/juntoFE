import assert from "node:assert/strict"
import test from "node:test"
import { AxiosError } from "axios"
import { makeRequest, normalizeApiDateValue } from "@/requests/utils"

const normalizeApiDateValueCases = [
    {
        name: "unix seconds",
        input: 1739212200,
        expected: "2025-02-10T18:30:00.000Z",
    },
    {
        name: "numeric strings",
        input: "1739212200",
        expected: "2025-02-10T18:30:00.000Z",
    },
    {
        name: "ISO date strings",
        input: "2026-03-28T18:30:00.000Z",
        expected: "2026-03-28T18:30:00.000Z",
    },
]

for (const { name, input, expected } of normalizeApiDateValueCases) {
    test(`normalizeApiDateValue handles ${name}`, () => {
        assert.equal(normalizeApiDateValue(input), expected)
    })
}

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
