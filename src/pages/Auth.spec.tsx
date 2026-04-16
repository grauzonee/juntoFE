import assert from "node:assert/strict"
import test from "node:test"
import type { ReactElement } from "react"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import { renderWithRouter } from "@/test/render"
import { testIds } from "@/testIds"

type AuthPageCase = {
    name: string
    route: string
    element: ReactElement
    formTestId: string
    inputs: string[]
    oppositeAuthHref: string
    oppositeAuthHrefCount: number
}

const authPageCases: AuthPageCase[] = [
    {
        name: "Login",
        route: "/login",
        element: <Login />,
        formTestId: testIds.auth.loginForm,
        inputs: [
            'input[name="email"][type="email"]',
            'input[name="password"][type="password"]',
        ],
        oppositeAuthHref: "/register",
        oppositeAuthHrefCount: 2,
    },
    {
        name: "Register",
        route: "/register",
        element: <Register />,
        formTestId: testIds.auth.registerForm,
        inputs: [
            'input[name="username"]',
            'input[name="email"][type="email"]',
            'input[name="password"][type="password"]',
            'input[name="repeatPassword"][type="password"]',
        ],
        oppositeAuthHref: "/login",
        oppositeAuthHrefCount: 2,
    },
]

for (const authPageCase of authPageCases) {
    test(`${authPageCase.name} page renders auth shell content and form fields`, () => {
        const view = renderWithRouter(authPageCase.element, { route: authPageCase.route })
        const form = view.getByTestId(authPageCase.formTestId)

        assert.ok(view.getByTestId(testIds.auth.card))
        assert.equal(view.getByTestId(testIds.auth.title).tagName, "H2")
        assert.ok(view.getByTestId(testIds.auth.description))

        for (const inputSelector of authPageCase.inputs) {
            assert.ok(form.querySelector(inputSelector), `Missing auth input: ${inputSelector}`)
        }

        assert.ok(form.querySelector('button[type="submit"]'))
        assert.equal(
            view.container.querySelectorAll(`a[href="${authPageCase.oppositeAuthHref}"]`).length,
            authPageCase.oppositeAuthHrefCount,
        )
    })
}
