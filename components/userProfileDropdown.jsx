import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";

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
								<a
									href="#"
									class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Dashboard
								</a>
							</li>
							<li>
								<button
									onClick={() => console.log("CLACK")}
									className="block w-44 py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Settings
								</button>
							</li>
							<li>
								<a
									href="#"
									class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Earnings
								</a>
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

/*
							<button
								type="button"
								className="mr-3 rounded-lg bg-yellow-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
								onClick={() => signOut()}
							>
								Logout
							</button>
*/
