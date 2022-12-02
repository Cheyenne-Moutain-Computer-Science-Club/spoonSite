import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";

// export default function Home() {
// 	return (
// 		<div>
// 			<h1>Hello World</h1>
// 		</div>
// 	);
// }

import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "../components/navbar";

export default function Home() {
	return (
		<div className="min-h-screen">
			<NavBar />
			{/* <div className="flex-grow">
				<h1>Infomation here</h1>
			</div> */}
			<Footer />
		</div>
	);
}
