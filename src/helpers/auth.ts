import { jwtDecode } from "jwt-decode";

export const isLoggedIn = (): boolean => {
    const token = window.localStorage.getItem("token");
    if (!token) return false;
    const { exp } = jwtDecode(token);
    if (!exp) return false;
    return Date.now() < exp * 1000;
}
