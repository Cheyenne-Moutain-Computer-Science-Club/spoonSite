import { signIn } from "@lib/auth";
import { useUserData } from "@lib/hooks";
import { useState } from "react";
import NavigationPages from "./pagesList";
import MobileExpandedMenu from "./mobileExpandedMenu";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
	const user = useUserData().user;

	const [mobileMenuState, setMobileMenuState] = useState(false);

	const mobileMenuButtonHandler = () => {
		setMobileMenuState((current) => !current);
	};

	return (
		<nav className="sticky top-0 rounded-b border-gray-200 bg-gradient-to-r from-blue-500 to-teal-300 py-2.5 lg:static lg:px-4">
			<div className="container mx-auto hidden flex-wrap items-center justify-between px-2 lg:flex">
				<Link href="/leaderboard" className="flex items-center">
					<img
						src="interact-logos/interact-logo-gray.png"
						className="mr-3 h-11"
						alt="Interact Club Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold text-white">
						Spoon Game
					</span>
				</Link>
				<NavigationPages />
				{user ? (
					<Link href="/profile" className="flex lg:order-2">
						<img
							className="h-10 w-10 rounded-full"
							src={user.photoURL}
							alt="user photo"
						/>
						<svg
							className="my-2 h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5l7 7-7 7"
							></path>
						</svg>
					</Link>
				) : (
					<div className="flex lg:order-2">
						<button
							type="button"
							className="flex rounded-lg border-2 border-indigo-600 bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white duration-150 hover:bg-transparent hover:text-gray-900"
							onClick={() => signIn()}
						>
							<svg
								className="mx-2 h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
								></path>
							</svg>
							Login
						</button>
					</div>
				)}
			</div>
			<div className="container mx-auto flex flex-wrap items-center justify-between px-2 lg:hidden">
				<Link href="/" className="flex items-center">
					<img
						src="interact-logos/interact-logo-gray.png"
						className="mr-3 h-11"
						alt="Interact Club Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold text-white">
						Spoon Game
					</span>
				</Link>
				<button
					className="mr-3 text-gray-900"
					onClick={mobileMenuButtonHandler}
				>
					{mobileMenuState ? (
						<svg
							className="h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					) : (
						<svg
							className="h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					)}
				</button>
			</div>
			{mobileMenuState && <MobileExpandedMenu />}
		</nav>
	);
}
