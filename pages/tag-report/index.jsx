import React from "react";
import { useState } from "react";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { app } from "@lib/firebase.js";
import { useUserData } from "../../lib/hooks.js";
import {
	query,
	collection,
	where,
	getFirestore,
	getDocs,
	increment,
} from "firebase/firestore";
import NavBar from "@components/navigation/navbar";
import Footer from "@components/navigation/footer";
import PageTitle from "@components/pageTitle";
import ErrorModal from "@components/modals/errorModal";
import SuccessModal from "@components/modals/successModal";

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
			if (!user) {
				throw "Oh no! You're not logged in.";
			} else if (taggerDoc.data().outBy == -1) {
				throw "You are trying to tag someone as a spectator. Please log in with the account that you used to play the game.";
			} else if (taggerDoc.data().outBy != 0) {
				throw "It would seem that you are attempting to tag someone, yet you also happen to be tagged. Nice try :^)";
			} else if (!(victimSnap.size > 0) || victimDoc.data().outBy == -1) {
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
				score: taggerDoc.data().score + victimDoc.data().score + 1,
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
			<div className="whitespace-nowrap text-3xl font-extrabold">
				{values.map((value, index) => (
					<input
						key={index}
						type="text"
						value={value}
						id={`input-${index}`}
						onChange={(event) => handleChangeTFA(event, index)}
						autoComplete="off"
						className="m-5 aspect-square w-20 rounded-2xl border-white bg-gray-200 py-6 text-center text-gray-900 outline-none focus:outline-white dark:bg-gray-800 dark:text-white"
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
					className="w-150 rounded-lg border-b-4 border-indigo-600 bg-gray-100 px-3 py-5 text-center text-base font-semibold tracking-wider text-gray-900 outline-none focus:outline-white dark:bg-gray-800 dark:text-white"
				></input>
			</div>
			<h3 className="ml-52 mt-2 flex justify-center text-xs text-gray-400">
				{values.filter((x) => x !== "").length} / 8
			</h3>
		</div>
	);

	return (
		<div>
			<NavBar />
			<div className="mx-2 mt-2 mb-5 lg:mx-8">
				<PageTitle>Tag Reporting</PageTitle>
				<br className="my-4" />
				<div className="mr-0 flex justify-center rounded-xl lg:mr-36">
					<ol className="list-disc space-y-1 text-xs font-semibold tracking-wide text-gray-800 dark:text-gray-300">
						<li className="">
							Ensure that you have read{" "}
							<Link href="/rules">
								<span className="text-blue-500 underline">
									the rules
								</span>
								<span className="text-amber-500">
									<div className="hidden lg:inline-block">
										<span className="text-gray-800 dark:text-gray-300">
											&nbsp;-&nbsp;
										</span>
										<span className="font-black">
											Do not
										</span>
										&nbsp;attempt to tag someone unless you
										have legitimately obtained their ID card
									</div>
								</span>
							</Link>
						</li>
						<li>
							<div className="hidden lg:block">
								Enter the 8-digit number from your
								victim&lsquo;s ID card into the box
								<span className="hidden lg:inline-block">
									es
								</span>
								&nbsp;below, then select &ldquo;Submit&ldquo;
							</div>
							<div className="block lg:hidden">
								Enter your victim&lsquo;s 8-digit ID below
							</div>
						</li>
					</ol>
				</div>
				<br className="my-0" />
				<div>
					<form onSubmit={handleSubmit} onReset={handleReset}>
						<div className="hidden lg:block">{TFAStyleInput}</div>
						<div className="block lg:hidden">{boxInput}</div>
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

			<Footer />
		</div>
	);
}
