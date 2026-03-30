import assert from "node:assert/strict"
import test from "node:test"
import Login from "@/pages/Login"
import { renderWithRouter } from "@/test/render"

test("Login page renders auth shell content and form fields", () => {
    const view = renderWithRouter(<Login />, { route: "/login" })

    assert.ok(view.getByText("Welcome back"))
    assert.ok(view.getByRole("heading", { name: "Pick up where your plans left off." }))
    assert.ok(view.getByText(/Log in to check upcoming events/i))
    assert.ok(view.getByLabelText("Email"))
    assert.ok(view.getByLabelText("Password"))
    assert.ok(view.getByRole("button", { name: "Log in" }))
    assert.ok(view.getByRole("link", { name: "Create an account" }))
})
