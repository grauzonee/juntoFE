import assert from "node:assert/strict"
import test from "node:test"
import { guestLoader } from "@/middlewares/AuthMiddleware"

function makeToken(exp: number) {
    return [
        Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url"),
        Buffer.from(JSON.stringify({ exp })).toString("base64url"),
        "",
    ].join(".")
}

test("guestLoader redirects logged-in users to discover events", () => {
    window.localStorage.setItem("token", makeToken(Math.floor(Date.now() / 1000) + 3600))

    try {
        guestLoader()
        assert.fail("guestLoader should redirect")
    } catch (error) {
        assert.ok(error instanceof Response)
        assert.equal(error.status, 302)
        assert.equal(error.headers.get("Location"), "/events")
    }
})
