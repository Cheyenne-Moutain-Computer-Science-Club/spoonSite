import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIRE_API,
	appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIRE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGE_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
