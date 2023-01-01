import { signOut } from "@lib/auth";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative top-[75vh] rounded-t-lg bg-white p-4 shadow dark:bg-gray-900 md:px-6 md:py-8">
			<div className="sm:flex sm:items-center sm:justify-between">
				<Link href="/" className="mb-4 flex items-center sm:mb-0">
					<img
						src="/Interact-Club-Official.png"
						className="mr-3 h-8"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
						Spoon Game
					</span>
				</Link>
				<ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
					<li>
						<Link
							href="#"
							className="mr-4 hover:underline md:mr-6 "
						>
							About
						</Link>
					</li>
					<li>
						<Link href="#" className="mr-4 hover:underline md:mr-6">
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link
							href="#"
							className="mr-4 hover:underline md:mr-6 "
						>
							Licensing
						</Link>
					</li>
					<li>
						<button
							onClick={() => signOut()}
							className="flex w-44 py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
			<hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
			<span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
				© 2022{" "}
				<Link href="" className="hover:underline">
					Chyenne Mountain Computer Science Club
				</Link>
				. All Rights Reserved.
			</span>
		</footer>
	);
}
