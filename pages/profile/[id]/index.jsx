import { getUserWithUsername } from "@lib/firebase";

export async function getServerSideProps({ query }) {
	const username = "Michael Mehall";

	// const userDoc = await getUserWithUsername(username);
	const userDoc = await getUserWithAuth();

	let user = userDoc.data();
	// const postsQuery = userDoc.ref
	// 	.collection("posts")
	// 	.where("published", "==", true)
	// 	.orderBy("createdAt", "desc")
	// 	.limit(5);
	// posts = (await postsQuery.get()).docs.map(postToJSON);

	return {
		props: { user }, // will be passed to the page component as props
	};
}

export default function UserProfilePage({ user }) {
	return (
		<main>
			<h1>{user.name}</h1>
		</main>
	);
}
