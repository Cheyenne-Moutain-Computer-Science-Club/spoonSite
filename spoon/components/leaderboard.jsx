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
import { app } from "../pages/_firebase.js";

const db = getFirestore(app);

// 	where("__name__", "!=", "global"),
const q = query(collection(db, "users"), orderBy("score", "asc"));

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
		return <PersonCard obj={data} key={i} />;
	});

	return <div>{cards}</div>;
}
