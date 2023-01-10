export default function PersonRow({ obj, place }) {
	const name = obj.name.replace("-Student", "");
	const image = obj.image;
	const score = obj.score;

	return (
		<ul class="divide-y divide-gray-700">
			<li class="pb-3 sm:pb-4">
				<div class="flex items-center space-x-4">
					<div class="flex-shrink-0">
						<img
							class="h-8 w-8 rounded-full"
							src={image}
							alt="Neil image"
						/>
					</div>
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-white">
							{name}
						</p>
						<p class="truncate text-sm text-gray-500 dark:text-gray-400">
							{score}
						</p>
					</div>
					<div class="inline-flex items-center text-base font-semibold text-white">
						{place}
					</div>
				</div>
			</li>
		</ul>
	);
}
