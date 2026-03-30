import type { ReactElement } from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"

type RenderWithRouterOptions = {
    route?: string
}

export function renderWithRouter(
    ui: ReactElement,
    { route = "/" }: RenderWithRouterOptions = {},
) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            {ui}
        </MemoryRouter>,
    )
}
