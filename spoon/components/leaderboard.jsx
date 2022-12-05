import {
	getFirestore,
	collection,
	getDocs,
	query,
	where,
	orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import PersonCard from "./personCard";
import PersonRow from "./personRow";
import { app } from "../pages/_firebase.js";

const db = getFirestore(app);

// 	where("__name__", "!=", "global"),
const q = query(collection(db, "users"), orderBy("score", "desc"));

const getData = async () => {
	let result = [];
	let querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		result.push(doc.data());
	});
	return result;
};

export default function Leaderboard() {
	const [data, setData] = useState(null);
	useEffect(() => {
		// Fetching Data on Initial Load
		getData().then((data) => setData(data));
	}, []);

	if (data == null) {
		return <div>Loading...</div>;
		// return <QuestionLoader />;
	}

	const cards = data.map((data, i) => {
		if (i < 3) {
			return <PersonCard obj={data} place={i + 1} key={i} />;
		}
	});

	const rows = data.map((data, i) => {
		if (i > 2 && i < 100) {
			return <PersonRow obj={data} place={i + 1} key={i} />;
		}
	});

	return (
		<div>
			<div className="container mx-auto mt-4">
				<div className="grid grid-cols-3">{cards}</div>
			</div>
			<div className="container mx-auto mt-4">{rows}</div>
		</div>
	);
}
