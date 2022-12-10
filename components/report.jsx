import React from "react";
import { useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { app } from "../pages/_firebase.js";
import {
    query,
    collection,
    where,
    getFirestore,
    getDocs,
} from "firebase/firestore";

const db = getFirestore(app);

export default function Report() {
    const { data: session } = useSession();

    const [formData, setFormData] = useState();

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
            await updateDoc(taggerRef, { tagged: newKillList });

            // Update victim's database entry to reflect who has tagged them
            const victimRef = doc(db, "users", victimDoc.id);
            const taggerID = taggerDoc.data().id;
            await updateDoc(victimRef, { outBy: taggerID });
        }
    };

    // Textbox handler
    const handleChange = (event) => {
        setFormData(event.target.value);
    };

    // Submit handler - publish data
    const handleSubmit = (event) => {
        event.preventDefault();
        publishTagData(Number(formData));
    };

    return (
        <div className="m-5">
            <div className="bg-gradient-to-r from-orange-400 to-pink-400">
                <h1 className="ml-2 mb-10 bg-gray-900 pl-3 font-sans text-7xl font-semibold text-white">
                    Tag Reporting
                </h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        name="uuid"
                        onChange={(event) => handleChange(event)}
                        type="text"
                        placeholder="ID"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="mt-9 rounded bg-indigo-600 py-1 px-3 text-xs hover:bg-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
