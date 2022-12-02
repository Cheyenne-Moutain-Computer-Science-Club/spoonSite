import { doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { app } from "../../_firebase.js";
import {
	query,
	collection,
	where,
	getFirestore,
	getDocs,
} from "firebase/firestore";
import { useState } from "react";
import Router from "next/router";

const db = getFirestore(app);

export default function newUser() {
	const { data: session } = useSession();

	const [registrationData, setRegistrationData] = useState({
		grade: "",
		affiliation: "",
		score: 0,
		badges: [],
		tagged: [],
		outBy: "",
		id: 00000000,
	});

	const publishNewUserData = async () => {
		// const q = query(
		// 	collection(db, "users"),
		// 	where("email", "==", session.user.email)
		// );

		const q = query(
			collection(db, "users"),
			where("__name__", "!=", "global")
		);

		let result = [];
		let querySnapshot = await getDocs(q);
		console.log(querySnapshot);
		querySnapshot.forEach((doc) => {
			result.push(doc.id);
		});
		let id = result[0];

		const userRef = doc(db, "users", id);
		await setDoc(userRef, registrationData, { merge: true });

		// Redirect to Leaderboard page after data is saved
		Router.push("/leaderboard");
	};

	const handleFormChange = (event) => {
		let data = { ...registrationData };
		data[event.target.name] = event.target.value;
		setRegistrationData(data);
	};

	const handleDropdownChange = (event) => {
		let data = { ...registrationData };
		data[event.target.name] = event.target.value;
		setRegistrationData(data);
	};

	return (
		<div>
			<h2 className="text-4xl font-bold dark:text-white">
				Please enter additional registration details here
			</h2>
			<form>
				<label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
					Select Your Grade
				</label>
				<select
					grade=""
					name="grade"
					onChange={(event) => handleDropdownChange(event)}
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				>
					<option>Choose your grade</option>
					<option value="9">9th</option>
					<option value="10">10th</option>
					<option value="11">11th</option>
					<option value="12">12th</option>
				</select>
				<label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
					Please enter your Group Affiliation (optional)
				</label>
				<input
					affiliation=""
					value={registrationData.affiliation}
					onChange={(event) => handleFormChange(event)}
					autoComplete="off"
					name="affiliation"
					placeholder="Affiliation"
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				/>
				<button
					className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
					onClick={publishNewUserData}
				>
					Submit
				</button>
			</form>
		</div>
	);
}
