import { doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { app } from "../../../public/_firebase.js";
import {
	query,
	collection,
	where,
	getFirestore,
	getDocs,
	limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Router from "next/router";

const db = getFirestore(app);

export default function NewUser() {
	const { data: session } = useSession();

	const [registrationData, setRegistrationData] = useState({
		grade: "",
		affiliation: "",
		score: 0,
		badges: [],
		tagged: [],
		outBy: 0,
		id: 0,
	});

	const publishData = async () => {
		// Only update once the ID is generated
		// Save data to Firestore
		const q = query(
			collection(db, "users"),
			where("email", "==", session.user.email),
			limit(1)
		);
		let id = (await getDocs(q)).docs[0].id;

		const userRef = doc(db, "users", id);
		await setDoc(userRef, registrationData, { merge: true });

		// Redirect to Leaderboard page after data is saved
		Router.push("/leaderboard");
	};

	useEffect(() => {
		if (registrationData.id !== 0) {
			publishData();
		}
	}, [registrationData.id]);

	const setId = async () => {
		let data = { ...registrationData };
		data.id = await generateId();
		setRegistrationData(data);
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
			<nav className="rounded-b border-gray-200 bg-gradient-to-r from-blue-500 to-teal-300 px-2 py-2.5 sm:px-4"></nav>
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
					onClick={setId}
				>
					Submit
				</button>
			</form>
		</div>
	);
}

const generateId = async () => {
	let id = 0;

	// Get the currently active ids
	const getCurrentActiveIds = async () => {
		const q = query(
			collection(db, "users"),
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
		const userRef = doc(db, "users", "global");
		await setDoc(userRef, { activeIds: [...currentActiveIds, newId] });
	};

	updateActiveIds(id);

	return id;
};
