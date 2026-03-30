import assert from "node:assert/strict"
import test from "node:test"
import Register from "@/pages/Register"
import { renderWithRouter } from "@/test/render"

test("Register page renders auth shell content and form fields", () => {
    const view = renderWithRouter(<Register />, { route: "/register" })

    assert.ok(view.getByText("Join Junto"))
    assert.ok(view.getByRole("heading", { name: "Start finding your people." }))
    assert.ok(view.getByText(/Create an account to discover local events/i))
    assert.ok(view.getByLabelText("Username"))
    assert.ok(view.getByLabelText("Email"))
    assert.ok(view.getByLabelText("Password"))
    assert.ok(view.getByLabelText("Repeat password"))
    assert.ok(view.getByRole("button", { name: "Create account" }))
    assert.equal(view.getAllByRole("link", { name: "Log in" }).length, 2)
})
