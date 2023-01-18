import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore, googleAuthProvider } from "./firebase";
import {
	collection,
	query,
	where,
	limit,
	getDocs,
	updateDoc,
} from "firebase/firestore";

export async function signIn() {
	signInWithPopup(auth, googleAuthProvider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// ...

			const q = query(
				collection(firestore, "users"),
				where("email", "==", user.email)
			);

			let clear = getDocs(q)
				.then((result) => {
					console.log(result.docs.length);
					if (result.docs.length == 0) {
						auth.signOut();
						alert(
							"Only players may sign in with their school accounts"
						);
						throw "Invalid";
					}

					console.log("Valid");
					return result;
				})
				.then((result) => {
					updateDoc(result.docs[0].ref, { image: user.photoURL });
				});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			// const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}

export async function signOut() {
	auth.signOut();
}
