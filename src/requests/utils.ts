import { isAxiosError, type AxiosResponse } from "axios";

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
                    throw new Error("Server error");

                default:
                    throw new Error(`Request failed with status ${status}`);
            }
        }

        throw new Error("Network error");
    }
}