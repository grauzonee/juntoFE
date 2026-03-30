import { afterEach } from "node:test"
import { cleanup } from "@testing-library/react"
import { JSDOM } from "jsdom"

const { window } = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost",
})

function defineGlobal(name: string, value: unknown) {
    Object.defineProperty(globalThis, name, {
        configurable: true,
        writable: true,
        value,
    })
}

defineGlobal("window", window)
defineGlobal("document", window.document)
defineGlobal("navigator", window.navigator)
defineGlobal("HTMLElement", window.HTMLElement)
defineGlobal("HTMLInputElement", window.HTMLInputElement)
defineGlobal("Node", window.Node)
defineGlobal("NodeFilter", window.NodeFilter)
defineGlobal("DocumentFragment", window.DocumentFragment)
defineGlobal("MutationObserver", window.MutationObserver)
defineGlobal("CustomEvent", window.CustomEvent)
defineGlobal("Event", window.Event)
defineGlobal("KeyboardEvent", window.KeyboardEvent)
defineGlobal("MouseEvent", window.MouseEvent)
defineGlobal("getComputedStyle", window.getComputedStyle.bind(window))
defineGlobal("localStorage", window.localStorage)
defineGlobal("sessionStorage", window.sessionStorage)
defineGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(callback, 0))
defineGlobal("cancelAnimationFrame", (handle: number) => window.clearTimeout(handle))

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
            return false
        },
    }),
})

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const htmlElementPrototype = window.HTMLElement.prototype as typeof window.HTMLElement.prototype & {
    attachEvent?: () => void
    detachEvent?: () => void
}

if (!htmlElementPrototype.attachEvent) {
    htmlElementPrototype.attachEvent = () => {}
}

if (!htmlElementPrototype.detachEvent) {
    htmlElementPrototype.detachEvent = () => {}
}

afterEach(() => {
    cleanup()
    window.localStorage.clear()
    window.sessionStorage.clear()
})
