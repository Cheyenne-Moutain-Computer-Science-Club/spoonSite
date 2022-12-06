import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import UserProfileDropdown from "./userProfileDropdown";
import Link from "next/link";

export default function NavBar() {
	const { data: session } = useSession();

	const [isLoading, setIsLoading] = useState(false);
	const buttonHandler = () => {
		setIsLoading((current) => !current);
	};

	let dropdown = false;

	useEffect(() => {
		dropdown = isLoading;
	}, [isLoading]);

	return (
		// bg-slate-900
		<nav className="rounded-b border-gray-200 bg-gradient-to-r from-orange-400 to-pink-400 px-2 py-2.5 sm:px-4">
			<div className="container mx-auto flex flex-wrap items-center justify-between">
				<Link href="/" className="flex items-center">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
						Spoon Game
					</span>
				</Link>
				{session ? (
					<UserProfileDropdown />
				) : (
					<div className="flex md:order-2">
						<button
							type="button"
							className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
							onClick={() => signIn()}
						>
							Login
						</button>
					</div>
				)}
				{session && (
					<div
						className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
						id="mobile-menu"
					>
						<ul className="mt-4 flex flex-col rounded-lg border border-gray-700 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
							<li>
								<Link
									href="/"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/leaderboard"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
								>
									Leaderboard
								</Link>
							</li>
							<li>
								<a
									href="#"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
}
