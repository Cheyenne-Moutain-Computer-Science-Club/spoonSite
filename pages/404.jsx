import Router from "next/router";

export default function ErrorPage() {
	return (
		<div className="flex justify-center align-middle text-lg font-bold text-white">
			Oops! Something went wrong. Click
			<span
				className="cursor-pointer px-2 text-indigo-500"
				onClick={() => Router.push("/")}
			>
				here
			</span>
			to return to safety
		</div>
	);
}
