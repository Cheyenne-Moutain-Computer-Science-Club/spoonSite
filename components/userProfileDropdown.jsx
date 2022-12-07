import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

// A component that displays a dropdown menu with a user's profile information
export default function UserProfileDropdown() {
	// Get the current user's data from the session
	const { data: session } = useSession();

	const [open, setOpen] = useState(false);

	const toggleDropdown = () => {
		setOpen(!open);
	};

	return (
		<div className="flex flex-col md:order-2">
			{/* onBlur={() => setOpen(false)} */}
			<button onClick={toggleDropdown}>
				<img
					className="h-10 w-10 rounded-full"
					src={session.user.image}
					alt="user photo"
				/>
			</button>
			{
				// If the dropdown is open, show the dropdown menu
				open && (
					<div class="absolute top-16 z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700">
						<ul
							class="py-1 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownDefault"
						>
							<li>
								<div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
									<div>{session.user.name}</div>
									<div class="truncate font-medium">
										{session.user.email}
									</div>
								</div>
							</li>
							<li>
								<button
									onClick={() => console.log("CLACK")}
									className="block w-44 py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Settings
								</button>
							</li>
							<li class="flex py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								<div className="mr-3 text-white">
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
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path>
									</svg>
								</div>
								<Link href="/profile">My Profile</Link>
							</li>
							<hr class="border-white" />
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
				)
			}
		</div>
	);
}
