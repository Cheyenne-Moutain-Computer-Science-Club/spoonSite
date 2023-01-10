import "../styles/globals.css";

import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
// import { SignInButton } from "../lib/_firebase";

export default function MyApp({ Component, pageProps }) {
    const userData = useUserData();

    return (
        <UserContext.Provider value={userData}>
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}
