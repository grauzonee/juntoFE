export class FormError<T> extends Error {
    field: keyof T | "root";

    constructor(field: keyof T | "root", message: string) {
        super(message);
        this.field = field;
    }
}

export function isFormError<T>(error: unknown): error is FormError<T> {
    return error instanceof FormError;
}
