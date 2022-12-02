import NavBar from "../../components/navbar";
import Leaderboard from "../../components/leaderboard";
import { getSession } from "next-auth/react";
import Footer from "../../components/footer";

import { useState, useEffect } from "react";

export default function LeaderboardPage() {
	return (
		<div>
			<NavBar />
			<Leaderboard />
			<Footer />
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
