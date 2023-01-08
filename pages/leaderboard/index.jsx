import NavBar from "@components/navbar";
import Footer from "@components/footer";
import { collection, query, orderBy } from "firebase/firestore";
import { useUserData } from "@lib/hooks.js";
import Image from "next/image";
import { firestore } from "@lib/firebase.js";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import IndividualLeaderboard from "@components/leaderboards/individuals";
import { useState } from "react";

const q = query(collection(firestore, "users"), orderBy("score", "desc"));

export default function LeaderboardPage() {
	const { user } = useUserData();
	const [leaderboard, setLeaderboard] = useState(0);

	const [values, loading, error, snapshot] = useCollectionDataOnce(q);

	if (loading == true) {
		return <div>Loading...</div>;
		// return <QuestionLoader />;
	}

	return (
		<>
			<NavBar />
			<h1 className="text-white">Leaderboard</h1>
			<div className="lg:m-10 lg:grid lg:grid-cols-7">
				{leaderboard == 0 && (
					<>
						<div className="lg:col-span-6 lg:col-start-1 lg:m-2">
							<IndividualLeaderboard data={values} user={user} />
						</div>
						<div className="col-span-1 col-start-7 mt-6 hidden h-20 rounded border-2 border-gray-700 bg-gray-800 shadow-xl lg:inline"></div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
}
