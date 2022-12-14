import { useContext } from "react";
import { UserContext } from "../lib/context";
import Router from "next/router";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
    const { user } = useContext(UserContext);

    // Redirect to home page if not signed in
    if (!user) {
        Router.push("/");
        return null;
    }

    // If signed in, return content
    return props.children;
}
