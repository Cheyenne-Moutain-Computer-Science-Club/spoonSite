export default function LeaderboardCards({ activeUsers, user }) {
	if (!activeUsers) {
		return;
	}

	console.log(activeUsers);

	return activeUsers.map((data, i) => {
		const name = data.name.replace("-Student", "");
		const image = data.image;
		const score = data.score + ` pt${data.score != 1 ? "s" : ""}.`;
		const place = i + 1;
		const highlight = data.name == user?.displayName;

		if (i < 3) {
			return (
				<div
					key={i}
					className={`m-4 rounded-lg border dark:border-gray-700 ${
						highlight
							? "bg-gradient-to-r from-blue-500 to-teal-300"
							: "bg-gray-50 dark:bg-gray-800"
					} shadow-md`}
				>
					<div className="flex flex-col items-center pb-10 pt-3">
						<h1 className="p-4">
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
						</h1>
						<img
							className="mb-3 h-24 w-24 rounded-full shadow-lg"
							src={image}
							alt={name}
						/>
						<h5
							className={`mb-1 text-center text-xl font-medium ${
								highlight
									? "text-gray-900"
									: "text-gray-900 dark:text-white"
							}`}
						>
							{name}
						</h5>
						<span
							className={`text-md ${
								highlight ? "text-gray-700" : "text-gray-400"
							}`}
						>
							{score}
						</span>
					</div>
				</div>
			);
		}
	});
}
