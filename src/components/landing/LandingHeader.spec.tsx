import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import test from "node:test"

test("LandingHeader anchors the mobile menu to the full header width", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/landing/LandingHeader.tsx"), "utf-8")

    assert.match(source, /<Collapsible open=\{isOpen\} onOpenChange=\{setIsOpen\}>/)
    assert.match(source, /className="border-t-\[3px\] border-border bg-cream md:hidden/)
    assert.match(source, /className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6"/)
    assert.doesNotMatch(source, /<Collapsible open=\{isOpen\} onOpenChange=\{setIsOpen\} className="relative md:hidden">/)
    assert.doesNotMatch(source, /className="absolute left-0 top-full w-full/)
})
