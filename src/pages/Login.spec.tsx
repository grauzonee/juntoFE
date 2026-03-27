import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import test from "node:test"

test("Login page renders auth shell content", () => {
    const source = readFileSync(resolve(process.cwd(), "src/pages/Login.tsx"), "utf-8")

    assert.match(source, /eyebrow="Welcome back"/)
    assert.match(source, /title="Pick up where your plans left off\."/)
    assert.match(source, /description="Log in to check upcoming events/)
})

test("Login page renders essential form controls", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/forms/LoginForm.tsx"), "utf-8")

    assert.match(source, /name="email"/)
    assert.match(source, /name="password"/)
    assert.match(source, /Create an account/)
})
