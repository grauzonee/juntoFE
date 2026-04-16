import assert from "node:assert/strict"
import test from "node:test"
import Register from "@/pages/Register"
import { renderWithRouter } from "@/test/render"
import { testIds } from "@/testIds"

test("Register page renders auth shell content and form fields", () => {
    const view = renderWithRouter(<Register />, { route: "/register" })
    const form = view.getByTestId(testIds.auth.registerForm)

    assert.ok(view.getByTestId(testIds.auth.card))
    assert.equal(view.getByTestId(testIds.auth.title).tagName, "H2")
    assert.ok(view.getByTestId(testIds.auth.description))
    assert.ok(form.querySelector('input[name="username"]'))
    assert.ok(form.querySelector('input[name="email"][type="email"]'))
    assert.ok(form.querySelector('input[name="password"][type="password"]'))
    assert.ok(form.querySelector('input[name="repeatPassword"][type="password"]'))
    assert.ok(form.querySelector('button[type="submit"]'))
    assert.equal(view.container.querySelectorAll('a[href="/login"]').length, 2)
})
