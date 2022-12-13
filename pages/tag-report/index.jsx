import React, { useEffect } from "react";
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
    const [showModal, setShowModal] = React.useState(false);

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
        let victimDoc = (await getDocs(queryVictim)).docs[0];

        if (taggerDoc.data().outBy != 0 || victimDoc.data().outBy != 0) {
            // Run if tagger or victim is already tagged
            alert("invalid");
        } else {
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
        }
    };

    function handleChange(event, index) {
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

    // Submit handler - publish data
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set new combined value
        let combinedValue = values;
        combinedValue = combinedValue.join("");
        // console.log(combinedValue);

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
                        onChange={(event) => handleChange(event, index)}
                        autoComplete="off"
                        className="m-5 w-20 rounded-2xl border-white bg-gray-800 py-6 text-center text-white"
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <NavBar />
            <div className="m-5">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400">
                    <h1 className="ml-2 mb-10 bg-gray-900 pl-3 font-sans text-7xl font-semibold text-white">
                        Tag Reporting
                    </h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        {TFAStyleInput}
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
            <button
                className="mr-1 mb-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Open small modal
            </button>
            {showModal
                ? ErrorModal(
                      () => setShowModal(false),
                      "It looks like you're trying to tag someone who is already tagged... Unfortunately that is not how this game works. Have a nice day!"
                  )
                : null}
        </div>
    );
}
