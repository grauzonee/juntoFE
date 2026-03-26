import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import test from "node:test"

test("Register page renders auth shell content", () => {
    const source = readFileSync(resolve(process.cwd(), "src/pages/Register.tsx"), "utf-8")

    assert.match(source, /eyebrow="Join Junto"/)
    assert.match(source, /title="Start finding your people\."/)
    assert.match(source, /description="Create an account to discover local events/)
})

test("Register page renders essential form controls", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/forms/RegisterForm.tsx"), "utf-8")

    assert.match(source, /name="username"/)
    assert.match(source, /name="email"/)
    assert.match(source, /name="repeatPassword"/)
    assert.match(source, /Create account/)
})
