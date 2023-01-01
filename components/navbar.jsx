// import { useSession, signIn, signOut } from "next-auth/react";
import { signIn, signOut } from "../lib/auth";
import { useUserData } from "../lib/hooks";
import { useState, useEffect } from "react";
import UserProfileDropdown from "./userProfileDropdown";
import Link from "next/link";

export default function NavBar() {
	const user = useUserData().user;

	const [mobileMenuState, setMobileMenuState] = useState(false);

	const mobileMenuButtonHandler = () => {
		setMobileMenuState((current) => !current);
	};

	const mobileMenu = (
		<div class="absolute top-12 w-screen rounded-sm bg-gradient-to-r from-blue-500 to-teal-300">
			{!user && loginButton}
			{true && menuItems}
			{true && (
				<div className="flex flex-col md:order-2">
					<ul
						class="py-1 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="personalDetails"
					>
						<br />
						<li class="py-2 px-4 hover:bg-gray-100">
							<Link
								href="/profile"
								className="flex text-gray-700"
							>
								<svg
									class="mr-2 h-6 w-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									></path>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									></path>
								</svg>
								Settings
							</Link>
						</li>
						<li class="flex py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
							<Link
								href="/profile"
								className="flex text-gray-700"
							>
								<svg
									class="mr-2 h-6 w-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									></path>
								</svg>
								My Profile
							</Link>
						</li>
						<hr class="border-white" />
						<li>
							<button
								onClick={() => signOut()}
								className="flex w-44 py-2 px-4 text-left text-gray-700"
							>
								<div class="mr-3 text-red-600">
									<svg
										class="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										></path>
									</svg>
								</div>
								Log Out
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);

	return (
		<nav className="rounded-b border-gray-200 bg-gradient-to-r from-blue-500 to-teal-300 py-2.5 sm:px-4">
			<div className="container mx-auto hidden flex-wrap items-center justify-between px-2 sm:flex">
				{logoBlock}
				{user ? <UserProfileDropdown /> : loginButton}
				{user && menuItems}
			</div>
			<div className="container mx-auto flex flex-wrap items-center justify-between px-2 sm:hidden">
				{logoBlock}
				<button
					className="mr-3 text-gray-700"
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
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					) : (
						// <svg
						// 	className="h-8 w-8"
						// 	fill="none"
						// 	stroke="currentColor"
						// 	viewBox="0 0 24 24"
						// 	xmlns="http://www.w3.org/2000/svg"
						// >
						// 	<path
						// 		stroke-linecap="round"
						// 		stroke-linejoin="round"
						// 		stroke-width="2"
						// 		d="M4 6h16M4 12h16M4 18h16"
						// 	></path>
						// </svg>

						// Cake:
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
							></path>
						</svg>
					)}
				</button>
			</div>
			{mobileMenuState && mobileMenu}
		</nav>
	);
}

const menuItems = (
	<div className="order-1 flex w-auto items-center justify-between">
		<ul className="rounded-lgp-4 mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
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
				<Link
					href="/team-leaderboard"
					className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
				>
					Team Leaderboard
				</Link>
			</li>
			<li>
				<Link
					href="/rules"
					className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
				>
					Rules
				</Link>
			</li>
		</ul>
	</div>
);

const logoBlock = (
	<Link href="/" className="flex items-center">
		<img
			src="/Interact-Club-Official.png"
			className="mr-3 h-6 sm:h-11"
			alt="Flowbite Logo"
		/>
		<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Spoon Game
		</span>
	</Link>
);

const loginButton = (
	<div className="flex md:order-2">
		<button
			type="button"
			className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
			onClick={() => signIn()}
		>
			Login
		</button>
	</div>
);
