import React from "react";

export default function DoubleBox(stat1, stat2, num1, num2) {
	return (
		<div className="h-52 w-52 rounded-3xl border-2 border-neutral-300 bg-gray-50 shadow-xl dark:bg-gray-800 md:h-24 md:w-48 md:border-0 lg:h-40 lg:w-80">
			<div className="flex h-full flex-col justify-start divide-x-0 divide-y md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
				<div className="mb-2 p-4 text-red-500 md:mb-0">
					<h1 className="text-4xl font-black md:text-2xl lg:text-5xl">
						{num1}
					</h1>
					<h2 className="text-sm font-semibold md:text-xs lg:text-lg">
						{stat1}
					</h2>
				</div>
				<div className="flex flex-grow flex-col justify-end p-4 align-bottom text-green-500">
					<h1 className="text-4xl font-black md:text-2xl lg:text-5xl">
						{num2}
					</h1>
					<h2 className="text-sm font-semibold md:text-xs lg:text-lg">
						{stat2}
					</h2>
				</div>
			</div>
		</div>
	);
}
