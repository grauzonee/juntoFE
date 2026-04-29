import { isLoggedIn } from "@/helpers/auth";
import { redirect } from "react-router";

export function guestLoader() {
    if (isLoggedIn()) {
        throw redirect("/events");
    }
    return null;
}

export function authLoader() {
    if (!isLoggedIn()) {
        throw redirect("/login");
    }
    return null;
}
