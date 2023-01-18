export default function LeaderboardCardSkeleton() {
	return (
		<div className="m-4 rounded-lg border bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
			<div className="flex animate-pulse items-center justify-between p-2">
				<svg
					className="h-20 w-20 text-gray-200 dark:text-gray-700"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
						clipRule="evenodd"
					></path>
				</svg>
				<div className="absolute left-40 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
				<div className="mx-4 hidden h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600 md:inline"></div>
			</div>
		</div>
	);
}
