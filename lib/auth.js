import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore, googleAuthProvider, generateNewID } from "./firebase";
import {
	collection,
	query,
	where,
	limit,
	getDocs,
	updateDoc,
	setDoc,
	doc,
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

			getDocs(
				query(
					collection(firestore, "users"),
					where("email", "==", user.email)
				)
			)
				.then((result) => {
					if (
						result.docs.length == 0 &&
						user.email.includes("@cmsd12.org") == false
					) {
						auth.signOut();
						alert("Please use your school account! (@cmsd12.org)");
						throw "Invalid";
					}

					console.log("Valid");
					return result;
				})
				.then((result) => {
					if (result.docs.length == 0) {
						let id = generateNewID().then((id) => {
							setDoc(doc(firestore, "users", String(id)), {
								name: user.displayName,
								email: user.email,
								image: user.photoURL,
								outBy: -1,
								id: id,
							});
						});
					} else {
						updateDoc(result.docs[0].ref, { image: user.photoURL });
					}
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
