// import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider } from "firebase/auth";
import { firebase, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIRE_API,
	appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIRE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGE_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
