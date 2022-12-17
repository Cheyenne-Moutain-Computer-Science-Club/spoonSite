import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import { useUserData } from "../lib/hooks";

export default function Home() {
	const { user } = useUserData();

	console.log(user);

	return (
		<div className="min-h-screen">
			<NavBar />
			<div className="flex-grow">
				<h1>Infomation here</h1>
			</div>
			<Footer />
		</div>
	);
}
