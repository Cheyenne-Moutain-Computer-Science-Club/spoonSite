import NavBar from "@components/navbar";
import Footer from "@components/footer";
import { useState, useEffect } from "react";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { app } from "@lib/firebase.js";
import { useUserData } from "@lib/hooks.js";
import Image from "next/image";

const db = getFirestore(app);

const q = query(collection(db, "users"), orderBy("score", "desc"));

const getData = async () => {
    let result = [];
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
};

export default function LeaderboardPage() {
    const [data, setData] = useState(null);
    const { user } = useUserData();

    useEffect(() => {
        // Fetching Data on Initial Load
        getData().then((data) => setData(data));
    }, []);

    if (data == null) {
        return <div>Loading...</div>;
        // return <QuestionLoader />;
    }

    const activeUsers = data.filter((person) => person.outBy == 0);
    const outUsers = data.filter((person) => person.outBy != 0);
    const leaderboard = [...activeUsers, ...outUsers];

    const cards = activeUsers.map((data, i) => {
        const name = data.name.replace("-Student", "");
        const image = data.image;
        const score = data.score + ` pt${data.score != 1 && "s"}.`;
        const place = i + 1;
        const highlight = data.name == user?.displayName;

        if (i < 3) {
            return (
                <div
                    key={i}
                    className={`m-4 rounded-lg border border-gray-700 ${
                        highlight
                            ? "bg-gradient-to-r from-blue-500 to-teal-300"
                            : "bg-gray-800"
                    } shadow-md`}
                >
                    <div className="flex flex-col items-center pb-10 pt-3">
                        <h1 className="p-4">
                            {place == 1 && (
                                <span className="m-2 rounded bg-yellow-200 px-2.5 py-0.5 text-lg font-medium text-yellow-800">
                                    1
                                </span>
                            )}
                            {place == 2 && (
                                <span className="m-2 rounded bg-gray-400 px-2.5 py-0.5 text-lg font-medium text-gray-800">
                                    2
                                </span>
                            )}
                            {place == 3 && (
                                <span className="m-2 rounded bg-amber-800 px-2.5 py-0.5 text-lg font-medium text-amber-500">
                                    3
                                </span>
                            )}
                        </h1>
                        <img
                            className="mb-3 h-24 w-24 rounded-full shadow-lg"
                            src={image}
                            alt={name}
                        />
                        <h5
                            className={`mb-1 text-center text-xl font-medium ${
                                highlight ? "text-gray-900" : "text-white"
                            }`}
                        >
                            {name}
                        </h5>
                        <span
                            className={`text-md ${
                                highlight ? "text-gray-700" : "text-gray-400"
                            }`}
                        >
                            {score}
                        </span>
                    </div>
                </div>
            );
        }
    });

    const rows = leaderboard.slice(3, leaderboard.length).map((data, i) => {
        const name = data.name.replace("-Student", "");
        const image = data.image;
        const score = data.score + ` pt${data.score != 1 && "s"}.`;
        const place = data.outBy ? "OUT" : i + 4;
        const highlight = data.name == user?.displayName;
        const gray = data.outBy;

        return (
            // <PersonRow obj={data} place={i + 1} key={i} highlight={false} gray={}/>

            <li
                key={i}
                className={`rounded py-3 sm:py-4 ${gray && "bg-gray-800"} ${
                    highlight && "bg-gradient-to-r from-blue-500 to-teal-300"
                }`}
            >
                <div className="flex items-center space-x-4">
                    <div
                        className={`m-2 inline-flex w-10 justify-center text-base font-semibold ${
                            highlight ? "text-gray-900" : "text-white"
                        }`}
                    >
                        {place}
                    </div>

                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={image}
                            alt="Profile image"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p
                            className={`truncate text-sm font-medium ${
                                highlight ? "text-gray-900" : "text-white"
                            }`}
                        >
                            {name}
                        </p>
                    </div>
                    <p
                        className={`p-2 text-sm ${
                            highlight ? "text-gray-700" : "text-gray-400"
                        }`}
                    >
                        {score}
                    </p>
                </div>
            </li>
        );
    });

    const mobileRows = leaderboard.map((data, i) => {
        const name = data.name.replace("-Student", "");
        const image = data.image;
        const score = data.score + ` pt${data.score != 1 ? "s" : ""}.`;
        const place = data.outBy ? "OUT" : i + 1;
        const highlight = data.name == user?.displayName;
        const gray = data.outBy;

        return (
            // <PersonRow obj={data} place={i + 1} key={i} highlight={false} gray={}/>

            <li
                key={i}
                className={`rounded py-3 sm:py-4 ${gray && "bg-gray-800"} ${
                    highlight && "bg-gradient-to-r from-blue-500 to-teal-300"
                }`}
            >
                <div className="flex items-center space-x-4">
                    <div
                        className={`m-2 inline-flex w-10 justify-center text-base font-semibold ${
                            highlight ? "text-gray-900" : "text-white"
                        }`}
                    >
                        {place > 3 && place}
                        {place == "OUT" && place}

                        {place == 1 && (
                            <span className="m-2 rounded bg-yellow-200 px-2.5 py-0.5 text-lg font-medium text-yellow-800">
                                1
                            </span>
                        )}
                        {place == 2 && (
                            <span className="m-2 rounded bg-gray-400 px-2.5 py-0.5 text-lg font-medium text-gray-800">
                                2
                            </span>
                        )}
                        {place == 3 && (
                            <span className="m-2 rounded bg-amber-800 px-2.5 py-0.5 text-lg font-medium text-amber-500">
                                3
                            </span>
                        )}
                    </div>

                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={image}
                            alt="Profile image"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p
                            className={`truncate text-sm font-medium ${
                                highlight ? "text-gray-900" : "text-white"
                            }`}
                        >
                            {name}
                        </p>
                    </div>
                    <p
                        className={`p-2 text-sm ${
                            highlight ? "text-gray-700" : "text-gray-400"
                        }`}
                    >
                        {score}
                    </p>
                </div>
            </li>
        );
    });

    return (
        <>
            <NavBar />
            <h1 className="text-white">Leaderboard</h1>
            <div className="lg:m-10">
                <div className="container mx-auto mt-4 hidden lg:inline">
                    <div className="grid grid-cols-3">{cards}</div>
                </div>
                <div className="container mx-auto mt-4 hidden lg:inline">
                    <ul className="divide-y divide-white">{rows}</ul>
                </div>
                <div className="container mx-auto mt-4 lg:hidden">
                    <ul className="divide-y divide-white">{mobileRows}</ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    // const session = await getSession(context);
    return {
        props: { a: null },
    };
}
