import React from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { app } from "../../public/_firebase.js";
import {
    query,
    collection,
    where,
    getFirestore,
    getDocs,
} from "firebase/firestore";
import NavBar from "../../components/navbar";
import ErrorModal from "../../components/errorModal.jsx";

const db = getFirestore(app);

export default function TagReport() {
    const [values, setValues] = useState(["", "", "", "", "", "", "", ""]);
    const [showModal, setShowModal] = useState(false);
    const [errModalMsg, setErrModalMsg] = useState("An error ocurred");

    const { data: session } = useSession();

    const publishTagData = async (uuid) => {
        // Tagger query (based on email)
        const queryTagger = query(
            collection(db, "users"),
            where("email", "==", session.user.email)
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

        try {
            // Error handling:
            if (taggerDoc.data().outBy != 0) {
                throw "It would seem that you are attempting to tag someone, yet you also happen to be tagged. Nice try :^)";
            } else if (!(victimSnap.size > 0)) {
                throw "Sorry, but the player ID that you have entered does not exist. Please ensure that you have entered the numbers properly.";
            } else if (victimDoc.data().outBy != 0) {
                throw "It looks like you're trying to tag someone who is already tagged... Unfortunately that's not how this game works. Have a nice day!";
            }

            // Run if tagger and victim are not tagged
            // Change this to a modal, alert (not this kind), confirmation message, etc.
            alert("You have successfully tagged " + victimDoc.data().name);
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

            // Return true if successful (used for submission confirmation)
            return true;
        } catch (err) {
            console.error(err);
            setErrModalMsg(err);
            setShowModal(true);
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

        // console.log(values);
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

        // console.log(values);
    }

    // Submit handler - publish data
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set new combined value
        let combinedValue = values;
        combinedValue = combinedValue.join("");
        // console.log(combinedValue);

        // TODO: Improve error handling
        publishTagData(Number(combinedValue));
    };

    // Reset handler - clear text fields
    const handleReset = () => {
        setValues(["", "", "", "", "", "", "", ""]);
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
                    className="w-150 rounded-lg border-b-4 border-indigo-600 bg-gray-800 px-3 py-5 text-center text-base font-semibold tracking-wider text-white"
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
            {/* <button
                className="mr-1 mb-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Open small modal
            </button> */}
            {showModal
                ? ErrorModal(() => setShowModal(false), errModalMsg)
                : null}
        </div>
    );
}
