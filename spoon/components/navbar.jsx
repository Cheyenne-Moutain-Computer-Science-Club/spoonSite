import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
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
		<nav className="rounded-b border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
			<div className="container mx-auto flex flex-wrap items-center justify-between">
				<Link href="/" className="flex items-center">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
						Flowbite
					</span>
				</Link>
				{session ? (
					<div className="flex items-center space-x-5 md:order-2">
						<img
							className="h-10 w-10 rounded-full"
							src={session.user.image}
							alt="user photo"
						/>
						<button
							type="button"
							className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
							onClick={() => signOut()}
						>
							Logout
						</button>

						<button
							data-collapse-toggle="mobile-menu"
							type="button"
							className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
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
						<ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
							<li>
								<Link
									href="/"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/leaderboard"
									className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
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
