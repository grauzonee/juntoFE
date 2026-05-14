import { jwtDecode } from "jwt-decode";

export const isLoggedIn = (): boolean => {
    const token = globalThis.localStorage.getItem("token");
    if (!token) return false;
    const { exp } = jwtDecode(token);
    if (!exp) return false;
    return Date.now() < exp * 1000;
}

export const logout = () => {
    globalThis.localStorage.removeItem("token");
    globalThis.location.reload();
}
