import { useState, useEffect } from "react";
import { app } from "@lib/firebase.js";
import {
	getFirestore,
	doc,
	getDoc,
	collection,
	where,
	query,
} from "firebase/firestore";
import Footer from "@components/navigation/footer";
import NavBar from "@components/navigation/navbar";
import Link from "next/link";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import LeaderboardCards from "@components/leaderboards/leaderboardCards";
import SingleBox from "@components/grid-boxes/singleBox";
import DoubleBox from "@components/grid-boxes/doubleBox";
import TripleBox from "@components/grid-boxes/tripleBox";
import { useUserData } from "@lib/hooks";
import LeaderboardCardSkeleton from "@components/leaderboards/leaderboardCardSkeleton";

const db = getFirestore(app);

const timeUntilEnd = () => {
	const currentDate = new Date();
	const endDate = new Date(Date.UTC(2023, 5, 19, 7, 0, 0, 0));
	const dayDifference =
		(endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
	return Math.round(dayDifference);
};

const bigStats = (stats, totalPlayers) => {
	return (
		<div className="flex justify-center" id="Homepage">
			<div className="mind-w-max mx-32 my-10 max-w-3xl rounded-xl border-2 border-neutral-300 bg-gray-100 py-5 pl-5 pr-8 dark:bg-darkerblue-100">
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
						{SingleBox("Coming soon...", "NaN")}
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
			<div className="mind-w-max mx-32 my-10 max-w-xl rounded-xl border-2 border-neutral-300 bg-gray-100 py-5 pl-5 pr-8 dark:bg-darkerblue-100">
				<div className="grid grid-cols-4 gap-5">
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
						{SingleBox("Coming soon...", "Null")}
					</div>
					<div className="col-span-3 h-full w-full">
						{TripleBox("Testing5", 47)}
					</div>
				</div>
			</div>
		</div>
	);
};

const smStats = (stats, totalPlayers) => {
	return (
		<div className="flex justify-center">
			<div className="my-10">
				<div className="flex flex-col gap-20">
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
						{SingleBox("Coming soon...", "Null")}
					</div>
					<div className="col-span-3 h-full w-full">
						{TripleBox("Testing5", 47)}
					</div>
				</div>
			</div>
		</div>
	);
};

const getStats = async () => {
	const docRef = doc(db, "users", "global");
	const stats = await getDoc(docRef);
	return [stats.data().usersOut, stats.data().totalPlayers];
};

export default function Home() {
	const [stats, setStats] = useState(0);
	// const [globalValues, globalLoading, globalError] =
	// 	useDocument(doc(db, "users", "global"));

	const [values, loading, error, snapshot] = useCollectionData(
		query(collection(db, "users"), where("outBy", "==", 0))
	);

	const { user } = useUserData();
	// Update # of users in the game statistics
	useEffect(() => {
		getStats().then((data) => setStats(data));
	}, []);

	return (
		<div className="min-h-screen">
			<NavBar />
			<div className="m-5 text-gray-900 dark:text-white">
				<div className="mt-5 flex flex-col justify-center">
					<div className="justify-center text-center font-sans">
						<h2 className="font-semibold">
							Cheyenne Mountain High School
						</h2>
						<h1 className="text-8xl font-extrabold">Spoon Game</h1>
					</div>
					<br className="my-10" />
					{user ? (
						<div className="flex flex-col items-center justify-center">
							<p className="font-xs text-gray-800 dark:text-gray-300">
								Let&lsquo;s be real. There&lsquo;s only one
								reason that you&lsquo;re here...
							</p>
							<Link href="/tag-report">
								<button className="w-50 mt-5 rounded-md border-2 border-indigo-600 bg-indigo-600 py-3 px-8 text-xl font-medium text-white duration-150 hover:bg-transparent hover:text-gray-900 dark:hover:text-white">
									Tag Someone
								</button>
							</Link>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center">
							<p className="font-xs text-gray-800 dark:text-gray-300">
								Be sure to sign in if you are playing this game!
							</p>
						</div>
					)}
					<br className="my-5" />
					<div className="mono ml-10 text-gray-900 dark:text-white">
						<h1 className="hidden border-b-8 border-dashed border-teal-300 p-4 text-4xl font-black tracking-widest lg:inline-block">
							Current Standings:
						</h1>
					</div>
					{loading ? (
						<div className="hidden grid-cols-3 lg:grid">
							<LeaderboardCardSkeleton />
							<LeaderboardCardSkeleton />
							<LeaderboardCardSkeleton />
						</div>
					) : (
						<div className="hidden grid-cols-3 lg:grid">
							<LeaderboardCards
								activeUsers={values}
								user={user}
								startIndex={0}
								endIndex={3}
							/>
						</div>
					)}
					<div className="hidden justify-center lg:flex">
						<Link href="/leaderboard">
							<button className="mt-5 w-72 rounded-md border-2 border-indigo-600 bg-indigo-600 py-3 px-8 text-xl font-medium text-white duration-150 hover:bg-transparent hover:text-gray-900 dark:hover:text-white">
								See More
							</button>
						</Link>
					</div>

					<br className="my-5" />
					<div className="hidden lg:block">
						{/* {bigStats(stats, totalPlayers)} */}
						{bigStats(stats[0], stats[1])}
					</div>
					<div className="hidden md:block lg:hidden">
						{/* {mdStats(stats, totalPlayers)} */}
						{mdStats(stats[0], stats[1])}
					</div>
					<div className="block md:hidden">
						{/* {smStats(stats, totalPlayers)} */}
						{smStats(stats[0], stats[1])}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
