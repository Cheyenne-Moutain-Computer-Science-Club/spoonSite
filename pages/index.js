import React from "react";
import { useState, useEffect } from "react";
import { app } from "../public/_firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Link from "next/link";
import SingleBox from "../components/grid-boxes/singleBox";
import DoubleBox from "../components/grid-boxes/doubleBox";
import TripleBox from "../components/grid-boxes/tripleBox";

const db = getFirestore(app);
const totalPlayers = 350;

const getStats = async () => {
    const docRef = doc(db, "users", "global");
    const stats = await getDoc(docRef);
    return stats.data().usersOut;
};

const timeUntilEnd = () => {
    const currentDate = new Date();
    const endDate = new Date(Date.UTC(2023, 4, 20, 7, 0, 0, 0));
    const dayDifference =
        (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
    return Math.round(dayDifference);
};

const bigStats = (stats, totalPlayers) => {
    return (
        <div className="flex justify-center">
            <div className="mind-w-max mx-32 my-10 max-w-3xl rounded-xl border-2 border-neutral-300 bg-darkerblue-100 py-5 pl-5 pr-8">
                <div className="grid grid-cols-4 gap-2">
                    <div className="h-full w-full">
                        {SingleBox("Total Players", totalPlayers)}
                    </div>
                    <div className="col-span-2 h-full w-full">
                        {DoubleBox(
                            "Tagged",
                            "Remaining",
                            stats,
                            totalPlayers - stats
                        )}
                    </div>
                    <div className="h-full w-full">
                        {SingleBox("Days Remaining", timeUntilEnd())}
                    </div>
                    <div className="h-full w-full">
                        {SingleBox("Coming soon", 0)}
                    </div>
                    <div className="col-span-3 h-full w-full">
                        {TripleBox("Testing5", 47)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mdStats = (stats, totalPlayers) => {
    return (
        <div className="flex justify-center">
            <div className="mind-w-max mx-32 my-10 max-w-3xl rounded-xl border-2 border-neutral-300 bg-darkerblue-100 py-5 pl-5 pr-8">
                <div className="grid grid-cols-4">
                    <div className="h-full w-full">
                        {SingleBox("Total Players", totalPlayers)}
                    </div>
                    <div className="col-span-2 h-full w-full">
                        {DoubleBox(
                            "Tagged",
                            "Remaining",
                            stats,
                            totalPlayers - stats
                        )}
                    </div>
                    <div className="h-full w-full">
                        {SingleBox("Days Remaining", timeUntilEnd())}
                    </div>
                    <div className="h-full w-full">
                        {SingleBox("Coming soon", 0)}
                    </div>
                    <div className="col-span-3 h-full w-full">
                        {TripleBox("Testing5", 47)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const [stats, setStats] = useState(null);

    // Update # of users in the game statistics
    useEffect(() => {
        getStats().then((data) => setStats(data));
    }, []);

    return (
        <div className="min-h-screen">
            <NavBar />
            <div className="m-5 text-white">
                <div className="mt-5 flex flex-col justify-center">
                    <div className="justify-center text-center font-sans">
                        <h2 className="font-semibold">
                            Cheyenne Mountain High School
                        </h2>
                        <h1 className="text-8xl font-extrabold">Spoon Game</h1>
                    </div>
                    <br className="my-10" />
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-xs text-gray-300">
                            Let's be real. There's only one reason that you're
                            here...
                        </p>
                        <Link href="/tag-report">
                            <button className="w-50 mt-5 rounded-md border-2 border-indigo-600 bg-indigo-600 py-3 px-8 text-xl font-medium text-white duration-150 hover:bg-transparent">
                                Tag Someone
                            </button>
                        </Link>
                    </div>
                    <br className="my-5" />

                    <div className="hidden lg:block">
                        {bigStats(stats, totalPlayers)}
                    </div>
                    <div className="hidden md:block lg:hidden">
                        {mdStats(stats, totalPlayers)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
