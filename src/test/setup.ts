import { afterEach } from "node:test"
import { JSDOM } from "jsdom"

const { window: domWindow } = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost",
})

function defineGlobal(name: string, value: unknown) {
    Object.defineProperty(globalThis, name, {
        configurable: true,
        writable: true,
        value,
    })
}

defineGlobal("window", domWindow)
defineGlobal("document", domWindow.document)
defineGlobal("navigator", domWindow.navigator)
defineGlobal("HTMLElement", domWindow.HTMLElement)
defineGlobal("HTMLInputElement", domWindow.HTMLInputElement)
defineGlobal("Node", domWindow.Node)
defineGlobal("NodeFilter", domWindow.NodeFilter)
defineGlobal("DocumentFragment", domWindow.DocumentFragment)
defineGlobal("MutationObserver", domWindow.MutationObserver)
defineGlobal("CustomEvent", domWindow.CustomEvent)
defineGlobal("Event", domWindow.Event)
defineGlobal("KeyboardEvent", domWindow.KeyboardEvent)
defineGlobal("MouseEvent", domWindow.MouseEvent)
defineGlobal("getComputedStyle", domWindow.getComputedStyle.bind(domWindow))
defineGlobal("localStorage", domWindow.localStorage)
defineGlobal("sessionStorage", domWindow.sessionStorage)
defineGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => domWindow.setTimeout(callback, 0))
defineGlobal("cancelAnimationFrame", (handle: number) => domWindow.clearTimeout(handle))

Object.defineProperty(domWindow, "matchMedia", {
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

defineGlobal("IS_REACT_ACT_ENVIRONMENT", true)

const htmlElementPrototype = domWindow.HTMLElement.prototype as typeof domWindow.HTMLElement.prototype & {
    attachEvent?: () => void
    detachEvent?: () => void
}

if (!htmlElementPrototype.attachEvent) {
    htmlElementPrototype.attachEvent = () => {}
}

if (!htmlElementPrototype.detachEvent) {
    htmlElementPrototype.detachEvent = () => {}
}

const { cleanup } = await import("@testing-library/react")

afterEach(() => {
    cleanup()
    globalThis.localStorage.clear()
    globalThis.sessionStorage.clear()
})
