import assert from "node:assert/strict"
import test from "node:test"
import Login from "@/pages/Login"
import { renderWithRouter } from "@/test/render"
import { testIds } from "@/testIds"

test("Login page renders auth shell content and form fields", () => {
    const view = renderWithRouter(<Login />, { route: "/login" })
    const form = view.getByTestId(testIds.auth.loginForm)

    assert.ok(view.getByTestId(testIds.auth.card))
    assert.equal(view.getByTestId(testIds.auth.title).tagName, "H2")
    assert.ok(view.getByTestId(testIds.auth.description))
    assert.ok(form.querySelector('input[name="email"][type="email"]'))
    assert.ok(form.querySelector('input[name="password"][type="password"]'))
    assert.ok(form.querySelector('button[type="submit"]'))
    assert.ok(view.container.querySelector('a[href="/register"]'))
})
