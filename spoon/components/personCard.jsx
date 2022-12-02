export default function PersonCard({ obj }) {
	const name = obj.name;
	const image = obj.image;
	const score = obj.score;

	return (
		<div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
			<div className="flex flex-col items-center pb-10 pt-10">
				<img
					className="mb-3 h-24 w-24 rounded-full shadow-lg"
					src={image}
					alt={name}
				/>
				<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
					{name}
				</h5>
				<span className="text-md text-gray-500 dark:text-gray-400">
					{score}
				</span>
			</div>
		</div>
	);
}
