import { signOut } from "@lib/auth";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative mt-16 rounded-t-lg bg-white p-4 shadow dark:bg-gray-900 md:px-6 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/" className="mb-4 flex items-center sm:mb-0">
                    <img
                        src="interact-logos/interact-logo-blue.png"
                        className="mr-3 h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                        Spoon Game
                    </span>
                </Link>
                <div className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
                    <button
                        onClick={() => signOut()}
                        className="flex w-44 py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <div className="mr-3 text-red-600">
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
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                ></path>
                            </svg>
                        </div>
                        Log Out
                    </button>
                </div>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                © 2022{" "}
                <Link href="" className="hover:underline">
                    Chyenne Mountain Computer Science Club
                </Link>
                . All Rights Reserved.
            </span>
            <div className="mt-2 flex justify-center gap-2">
                {/* Any iconlink placeholder */}
                <Image
                    src="/meta-icons/React-Dark.svg"
                    alt="ReactJS logo"
                    width={32}
                    height={32}
                />

                <Image
                    src="/meta-icons/Next-Dark.svg"
                    alt="NextJS logo"
                    width={32}
                    height={32}
                />

                <Image
                    src="/meta-icons/Tailwind-Dark.svg"
                    alt="TailwindCSS logo"
                    width={32}
                    height={32}
                />
            </div>
        </footer>
    );
}
