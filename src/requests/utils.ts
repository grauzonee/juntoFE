import { isAxiosError, type AxiosResponse } from "axios";

const genericServerErrorMessage = "Oops, something happened on our server!"

export function normalizeApiDateValue(value: string | number): string {
    let parsedValue: string | number = value

    if (typeof value !== "number" && /^\d+$/.test(value.trim())) {
        parsedValue = Number(value)
    }

    let normalizedTimestamp: string | number = parsedValue
    if (typeof parsedValue === "number" && parsedValue < 1_000_000_000_000) {
        normalizedTimestamp = parsedValue * 1000
    }

    const date = new Date(normalizedTimestamp)

    if (Number.isNaN(date.getTime())) {
        return String(value)
    }

    return date.toISOString()
}

export async function makeRequest<T>(
    callback: () => Promise<AxiosResponse<T>>, entityName = "resource"
): Promise<T> {
    try {
        const response = await callback();
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const resorceName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            const status = error.response?.status;

            switch (status) {
                case 401:
                    throw new Error("Unauthorized");

                case 403:
                    throw new Error("Forbidden");

                case 404:
                    throw new Error(`${resorceName} not found`);

                case 500:
                    throw new Error(genericServerErrorMessage);

                default:
                    throw new Error(status ? `Request failed with status ${status}` : genericServerErrorMessage);
            }
        }

        throw new Error("Network error");
    }
}
