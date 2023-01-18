import NavigationPages from "./pagesList";
import { signIn, signOut } from "@lib/auth";
import { useUserData } from "@lib/hooks";
import Link from "next/link";

export default function MobileExpandedMenu() {
	const { user } = useUserData();

	return (
		<div className="absolute w-screen rounded-sm bg-gradient-to-r from-blue-500 to-teal-300 lg:hidden">
			<NavigationPages />
			{user ? (
				<>
					<hr className="border-gray-900" />
					<div className="flex justify-between">
						<div className="py-3 px-4 text-sm text-gray-900">
							<div>{user.displayName}</div>
							<div className="truncate font-medium">
								{user.email}
							</div>
						</div>
						<Link
							href="/leaderboard"
							className="flex justify-end py-3 hover:text-white lg:order-2"
						>
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
					</div>
				</>
			) : (
				<>
					<hr className="border-gray-900" />
					<button
						className="my-3 flex w-full justify-between px-3 text-gray-900 hover:text-white lg:hidden"
						onClick={() => signIn()}
					>
						Login
						<svg
							className="h-6 w-6"
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
					</button>
				</>
			)}
		</div>
	);
}
