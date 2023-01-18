import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
	getFirestore,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	collection,
	limit,
	updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_FIRE_API}`,
	appId: `${process.env.NEXT_PUBLIC_FIRE_APP_ID}`,
	authDomain: `${process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN}`,
	projectId: `${process.env.NEXT_PUBLIC_FIRE_PROJECT_ID}`,
	storageBucket: `${process.env.NEXT_PUBLIC_FIRE_BUCKET}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_FIRE_MESSAGE_ID}`,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);

export async function generateNewID() {
	let id = 0;

	// Get the currently active ids
	const getCurrentActiveIds = async () => {
		const q = query(
			collection(firestore, "users"),
			where("__name__", "==", "global"),
			limit(1)
		);
		let globalDocuments = await getDocs(q);
		return globalDocuments.docs[0].data().activeIds;
	};
	let currentActiveIds = await getCurrentActiveIds();

	// generates a random 8 digit number
	const generateVaildRandomNumber = () => {
		return Math.floor(Math.random() * 900000000 + 100000000);
	};

	// checks to see if the id is already in use
	while (true) {
		let randomNumber = generateVaildRandomNumber();
		if (!currentActiveIds.includes(randomNumber)) {
			id = randomNumber;
			break;
		}
	}

	// update the remote database with the new id
	const updateActiveIds = async (newId) => {
		const userRef = doc(firestore, "users", "global");
		await updateDoc(userRef, { activeIds: [...currentActiveIds, newId] });
	};

	updateActiveIds(id);

	return id;
}
