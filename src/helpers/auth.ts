export const isLoggedIn = (): boolean => {
    const token = window.localStorage.getItem("token");
    console.log(token)
    return !!(token && token.length > 1)
}
