export default function PageTitle(props) {
	return (
		<div className="mono text-gray-900 dark:text-white">
			<h1 className="inline-block border-b-8 border-dashed border-teal-300 p-4 text-4xl font-black tracking-widest lg:text-6xl">
				{props.children}
			</h1>
		</div>
	);
}
