import { signIn } from "@lib/auth";
import { useUserData } from "@lib/hooks";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
    const user = useUserData().user;

    const [mobileMenuState, setMobileMenuState] = useState(false);

    const mobileMenuButtonHandler = () => {
        setMobileMenuState((current) => !current);
    };

    const pagesList = (
        <div className="order-1 flex w-full items-center justify-between lg:w-auto">
            <ul className="rounded-lgp-4 mt-4 flex w-full flex-col lg:mt-0 lg:w-auto lg:flex-row lg:space-x-8 lg:border-0 lg:text-sm lg:font-medium">
                <li>
                    <Link
                        href="/"
                        className="flex justify-between py-2 pl-3 pr-4 text-gray-900 hover:text-white lg:p-0"
                    >
                        Home
                        <svg
                            className="h-6 w-6 lg:hidden"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/leaderboard"
                        className="flex justify-between py-2 pl-3 pr-4 text-gray-900 hover:text-white lg:p-0"
                    >
                        Leaderboard
                        <svg
                            className="h-6 w-6 lg:hidden"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            ></path>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/rules"
                        className="flex justify-between py-2 pl-3 pr-4 text-gray-900 hover:text-white lg:p-0"
                    >
                        Rules
                        <svg
                            className="h-6 w-6 lg:hidden"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            ></path>
                        </svg>
                    </Link>
                </li>
                {user && (
                    <li>
                        <Link
                            href="/tag-report"
                            className="flex justify-between py-2 pl-3 pr-4 text-gray-900 hover:text-white lg:p-0"
                        >
                            Tag Someone
                            <svg
                                className="h-6 w-6 lg:hidden"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                ></path>
                            </svg>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );

    const mobileExpandedMenu = (
        <div className="absolute w-screen rounded-sm bg-gradient-to-r from-blue-500 to-teal-300 lg:hidden">
            {pagesList}
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
                            href={`/profile/${user.displayName}`}
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

    return (
        <nav className="sticky top-0 rounded-b border-gray-200 bg-gradient-to-r from-blue-500 to-teal-300 py-2.5 lg:static lg:px-4">
            <div className="container mx-auto hidden flex-wrap items-center justify-between px-2 lg:flex">
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
                {pagesList}
                {user ? (
                    <Link
                        href={`/profile/${user.displayName}`}
                        className="flex lg:order-2"
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
            {mobileMenuState && mobileExpandedMenu}
        </nav>
    );
}
