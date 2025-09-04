export const isLoggedIn = (): boolean => {
    const token = window.localStorage.getItem("token");
    return !!(token && token.length > 1)
}
