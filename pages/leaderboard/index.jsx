import NavBar from "@components/navigation/navbar";
import Footer from "@components/navigation/footer";
import { collection, query, orderBy } from "firebase/firestore";
import { useUserData } from "@lib/hooks.js";
import { firestore } from "@lib/firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import PageTitle from "@components/pageTitle";
import LeaderboardCards from "@components/leaderboards/leaderboardCards";
import LeaderboardRows from "@components/leaderboards/leaderboardRows";
import LeaderboardCardSkeleton from "@components/leaderboards/leaderboardCardSkeleton";
import LeaderboardRowSkeleton from "@components/leaderboards/leaderboardRowSkeleton";

export default function LeaderboardPage() {
	const { user } = useUserData();

	const [values, loading, error, snapshot] = useCollectionData(
		query(collection(firestore, "users"), orderBy("score", "desc"))
	);

	if (loading) {
		return (
			<>
				<NavBar />
				<div className="mx-2 mt-2 mb-5 lg:mx-8">
					<PageTitle>Leaderboard</PageTitle>
				</div>
				<div className="lg:m-10 lg:grid lg:grid-cols-7">
					<div className="lg:col-span-7 lg:col-start-1 lg:m-2">
						<div className="container mx-auto mt-4 hidden lg:inline">
							<div className="grid grid-cols-3">
								<LeaderboardCardSkeleton />
								<LeaderboardCardSkeleton />
								<LeaderboardCardSkeleton />
							</div>
							{/* <ul className="divide-y divide-gray-100 dark:divide-white">
								<LeaderboardRowSkeleton />
							</ul> */}
						</div>
						<ul className="divide-y">
							<LeaderboardRowSkeleton />
							<LeaderboardRowSkeleton />
							<LeaderboardRowSkeleton />
							<LeaderboardRowSkeleton />
							<LeaderboardRowSkeleton />
						</ul>
					</div>
				</div>
			</>
		);
	}

	const activeUsers = values.filter((person) => person.outBy == 0);
	const outUsers = values.filter((person) => person.outBy != 0);
	const leaderboard = [...activeUsers, ...outUsers];

	return (
		<>
			<NavBar />
			<div className="mx-2 mt-2 mb-5 lg:mx-8">
				<PageTitle>Leaderboard</PageTitle>
			</div>
			<div className="lg:m-10 lg:grid lg:grid-cols-7">
				<div className="lg:col-span-7 lg:col-start-1 lg:m-2">
					<div className="container mx-auto mt-4 hidden lg:inline">
						<div className="grid grid-cols-3">
							<LeaderboardCards
								activeUsers={activeUsers}
								user={user}
								startIndex={0}
								endIndex={3}
							/>
						</div>
						<ul className="divide-y divide-gray-100 dark:divide-white">
							<LeaderboardRows
								leaderboardData={leaderboard}
								user={user}
								startIndex={3}
								endIndex={leaderboard.length}
							/>
						</ul>
					</div>
					<div className="container mx-auto mt-4 lg:hidden">
						<ul className="divide-y divide-gray-100 dark:divide-white">
							<LeaderboardRows
								mobile={true}
								leaderboardData={leaderboard}
								startIndex={0}
								endIndex={leaderboard.length}
							/>
						</ul>
					</div>
				</div>

				{/* <div className="lg:col-span-6 lg:col-start-1 lg:m-2">
						{/*<TeamLeaderboard data={values} user={user} />
								<p>Sorry, not here yet</p>
					</div> */}
				{/* <div className="col-span-1 col-start-7 mt-6 hidden h-20 rounded border-2 border-gray-700 bg-gray-800 shadow-xl lg:inline">
					<button
						className="mx-4 mt-2 flex justify-between text-white hover:text-gray-400"
						onClick={() => setLeaderboard(1)}
					>
						Teams
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							></path>
						</svg>
					</button>
					<button
						className="mx-4 mt-2 flex justify-between text-white hover:text-gray-400"
						onClick={() => setLeaderboard(0)}
					>
						Individuals
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							></path>
						</svg>
					</button>
				</div> */}
			</div>
			<Footer />
		</>
	);
}
