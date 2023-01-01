import React from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { app } from "../../lib/firebase.js";
import { useUserData } from "../../lib/hooks.js";
import AuthCheck from "../../components/authCheck";
import {
	query,
	collection,
	where,
	getFirestore,
	getDocs,
	increment,
} from "firebase/firestore";
import NavBar from "../../components/navbar";
import ErrorModal from "../../components/modals/errorModal.jsx";
import SuccessModal from "../../components/modals/successModal.jsx";

const db = getFirestore(app);

export default function TagReport() {
	const [values, setValues] = useState(["", "", "", "", "", "", "", ""]);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [successModalData, setSuccessModalData] = useState(Array(2));
	const [showErrModal, setShowErrModal] = useState(false);
	const [errModalMsg, setErrModalMsg] = useState("An error ocurred");

	// Session
	const { user } = useUserData();

	const publishTagData = async (uuid) => {
		// Tagger query (based on email)
		const queryTagger = query(
			collection(db, "users"),
			where("email", "==", user.email)
		);
		let taggerDoc = (await getDocs(queryTagger)).docs[0];

		// Reported to be tagged query (based on id)
		const queryVictim = query(
			collection(db, "users"),
			where("id", "==", uuid)
		);
		let victimSnap = await getDocs(queryVictim);
		let victimDoc = victimSnap.docs[0];
		// console.log(victimSnap);
		// console.log("Exists output: " + victimSnap.exists);

		// Try statement success status
		let success = true;
		try {
			// Error handling:
			if (taggerDoc.data().outBy != 0) {
				throw "It would seem that you are attempting to tag someone, yet you also happen to be tagged. Nice try :^)";
			} else if (!(victimSnap.size > 0)) {
				throw "Sorry, but the player ID that you have entered does not exist. Please ensure that you have entered the numbers properly.";
			} else if (taggerDoc.data().id == victimDoc.data().id) {
				throw "You can't tag yourself silly! Why are you even trying to do that? It's like you don't want to win.";
			} else if (victimDoc.data().outBy != 0) {
				throw "It looks like you're trying to tag someone who is already tagged... Unfortunately that's not how this game works. Have a nice day!";
			}

			// Run if tagger and victim are not tagged
			// Append victim to tagger's "kill list"
			const taggerRef = doc(db, "users", taggerDoc.id);
			const newKillList = [...taggerDoc.data().tagged, uuid];
			await updateDoc(taggerRef, {
				tagged: newKillList,
				score: taggerDoc.data().score + 1,
			});

			// Update victim's database entry to reflect who has tagged them
			const victimRef = doc(db, "users", victimDoc.id);
			const taggerID = taggerDoc.data().id;
			await updateDoc(victimRef, { outBy: taggerID });
		} catch (err) {
			success = false;
			console.error(err);
			setErrModalMsg(err);
			setShowErrModal(true);
		} finally {
			// Run only if try statement did not throw an error
			if (success) {
				// This is used for the success modal
				setSuccessModalData([
					victimDoc.data().name,
					taggerDoc.data().tagged.length + 1, // Add 1 b/c length always returns 1 less than actual
				]);
				// Return true if successful (used for submission confirmation)
				return true;
			}
		}
	};

	function handleChangeTFA(event, index) {
		const newValues = [...values];
		const value = event.target.value;
		if (/^[0-9]$/.test(value) || value === "") {
			newValues[index] = value;
			setValues(newValues);
		}

		if (index < values.length - 1 && value.length > 0) {
			const nextInput = document.getElementById(`input-${index + 1}`);
			nextInput.focus();
		}
	}

	// This function handles the change of the textbox so the same state can be used as TFAStyle
	function handleChangeNormal(event) {
		// For the normal input change handler, the entire input is event.target.value
		const newInput = event.target.value.split("");

		if (/^\d*$/.test(event.target.value)) {
			const newValues = [
				...newInput,
				...Array(8 - newInput.length).fill(""),
			];
			setValues(newValues);
		}
	}

	// Reset handler - clear text fields
	const handleReset = () => {
		setValues(["", "", "", "", "", "", "", ""]);
	};

	// Submit handler - publish data
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Set new combined value
		let combinedValue = values;
		combinedValue = combinedValue.join("");

		// Publish data then receive confirmation status
		const publishStatus = await publishTagData(Number(combinedValue));
		if (publishStatus) {
			// If publish is successful

			// Increment tagged counter
			updateDoc(doc(db, "users", "global"), {
				usersOut: increment(1),
			});

			// Clear text fields
			handleReset();
			// Show success modal
			setShowSuccessModal(true);
		}
	};

	const TFAStyleInput = (
		<div name="2FAStyleInputs" className="flex justify-center">
			<div className="overflow-scroll whitespace-nowrap">
				{values.map((value, index) => (
					<input
						key={index}
						type="text"
						value={value}
						id={`input-${index}`}
						onChange={(event) => handleChangeTFA(event, index)}
						autoComplete="off"
						className="m-5 w-20 rounded-2xl border-white bg-gray-800 py-6 text-center text-white"
					/>
				))}
			</div>
		</div>
	);

	const boxInput = (
		<div>
			<div className="flex justify-center">
				<input
					id="input-single"
					type="text"
					maxLength="8"
					pattern="[0-9]*"
					inputMode="numeric"
					onChange={(event) => handleChangeNormal(event)}
					autoComplete="off"
					className="w-150 rounded-lg border-b-4 border-indigo-600 bg-gray-800 px-3 py-5 text-center text-base font-semibold tracking-wider text-white"
				></input>
			</div>
			<h3 className="ml-52 mt-2 flex justify-center text-xs text-gray-400">
				{values.filter((x) => x !== "").length} / 8
			</h3>
		</div>
	);

	return (
		<AuthCheck>
			<div>
				<NavBar />
				<div className="m-5">
					<div className="bg-gradient-to-r from-orange-400 to-pink-400">
						<h1 className="mb-11 ml-2 bg-gray-900 pl-3 font-sans text-5xl font-semibold text-white">
							Tag Reporting
						</h1>
					</div>
					<div>
						<form onSubmit={handleSubmit} onReset={handleReset}>
							<div className="invisible lg:visible">
								{TFAStyleInput}
							</div>
							<div className="visible lg:hidden">{boxInput}</div>
							<div className="mt-10 flex justify-center">
								<button
									type="submit"
									className=" rounded-md bg-indigo-600 py-2 px-8 text-base text-white hover:bg-indigo-500"
								>
									Submit
								</button>
								<button
									type="reset"
									className="ml-7 rounded-md bg-red-500 py-2 px-9 text-base text-white hover:bg-red-400"
								>
									Reset
								</button>
							</div>
						</form>
					</div>
				</div>

				{showErrModal
					? ErrorModal(() => setShowErrModal(false), errModalMsg)
					: null}

				{showSuccessModal
					? SuccessModal(
							() => setShowSuccessModal(false),
							successModalData[0],
							successModalData[1]
					  )
					: null}
			</div>
		</AuthCheck>
	);
}

// :)
