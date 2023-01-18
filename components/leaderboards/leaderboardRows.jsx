export default function LeaderboardRows({
	leaderboardData,
	user,
	startIndex,
	endIndex,
}) {
	if (!leaderboardData) {
		return;
	}

	return leaderboardData.slice(startIndex, endIndex).map((data, i) => {
		const name = data.name.replace("-Student", "");
		const image = data.image;
		const score = data.score + ` pt${data.score != 1 ? "s" : ""}.`;
		const place = data.outBy ? "OUT" : i + 1 + startIndex;
		const highlight = data.name == user?.displayName;
		const gray = data.outBy;

		return (
			<li
				key={i}
				className={`rounded py-3 sm:py-4 ${
					gray && "bg-gray-100 dark:bg-gray-800"
				} ${highlight && "bg-gradient-to-r from-blue-500 to-teal-300"}`}
			>
				<div className="flex items-center space-x-4">
					<div
						className={`m-2 inline-flex w-10 justify-center text-base font-semibold ${
							highlight
								? "text-gray-900"
								: "text-gray-900 dark:text-white"
						}`}
					>
						{place > 3 && place}
						{place == "OUT" && place}

						{place == 1 && (
							<span className="m-2 rounded bg-yellow-200 px-2.5 py-0.5 text-lg font-medium text-yellow-800">
								1
							</span>
						)}
						{place == 2 && (
							<span className="m-2 rounded bg-gray-400 px-2.5 py-0.5 text-lg font-medium text-gray-800">
								2
							</span>
						)}
						{place == 3 && (
							<span className="m-2 rounded bg-amber-800 px-2.5 py-0.5 text-lg font-medium text-amber-500">
								3
							</span>
						)}
					</div>

					<div className="flex-shrink-0">
						<img
							className="h-8 w-8 rounded-full"
							src={image}
							alt="Profile image"
						/>
					</div>

					<div className="min-w-0 flex-1">
						<p
							className={`truncate text-sm font-medium ${
								highlight
									? "text-gray-900"
									: "text-gray-900 dark:text-white"
							}`}
						>
							{name}
						</p>
					</div>
					<p
						className={`p-2 text-sm ${
							highlight ? "text-gray-700" : "text-gray-400"
						}`}
					>
						{score}
					</p>
				</div>
			</li>
		);
	});
}
