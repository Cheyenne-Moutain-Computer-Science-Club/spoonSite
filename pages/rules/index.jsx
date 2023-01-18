import NavBar from "@components/navigation/navbar";
import Footer from "@components/navigation/footer";
import PageTitle from "@components/pageTitle";

export default function Rules() {
	return (
		<div>
			<NavBar />
			<div className="mx-2 mt-2 mb-5 leading-8 tracking-wider text-gray-900 dark:text-gray-300 lg:mx-8">
				<div>
					<PageTitle>Rules</PageTitle>
				</div>
				<br />
				<p className="mx-6 font-semibold text-gray-800 dark:text-gray-200 md:mx-24 lg:mx-48">
					All rules are made to protect student safety, learning, and
					privacy. The rules are, but not limited to the following:
				</p>
				<ol className="mx-8 my-5 list-decimal space-y-8 text-sm marker:font-black marker:text-gray-800 dark:marker:text-white md:mx-28 md:text-lg lg:mx-56">
					<li className="emphasis">
						All school rules listed in the student handbook apply to
						this game.
					</li>
					<li>
						Gameplay areas:
						<ul className="ml-5 list-disc space-y-2">
							<li>
								<span className="emphasis">
									The following areas are considered “safe
									zones”
								</span>
								&nbsp;and you can not be tagged while in these
								zones: bathrooms, classrooms, athletic
								practices, parking lot, locker rooms, library,
								computer lab, Kiva, the gyms, weight room,
								field, and pool while class is in session, and
								anywhere that is not inside the physical school
								building, except the stadium.
							</li>
							<li>
								<span className="emphasis">
									Gameplay will commence in these areas:
								</span>
								&nbsp;hallways, cafeteria, in the courtyard, in
								the gyms while there is no class and at after
								school events (sports games, etc).
							</li>
							<li>
								If your class is moving from one place in the
								school to another as a group during class time,
								gameplay will commence and to avoid being tagged
								you must hold your spoon in the hallway until
								you reach your new location (ie. fire drill,
								moving from classroom to library, assemblies)
							</li>
							<li>
								Classrooms, library, computer lab, and Kiva
								are&nbsp;
								<span className="emphasis">not safe zones</span>
								&nbsp;before school (up to the beginning of 1st
								period @ 8:25 am) and after school (starting @
								3:45 pm) unless it is a Zero-Hour classroom.
							</li>
						</ul>
					</li>
					<li>
						There will be no running or yelling; this will result in
						removal from the game.
					</li>
					<li>
						Spoon related rules:
						<ul className="ml-5 list-disc space-y-2">
							<li>
								<span className="emphasis">
									Spoons must be held in your hand and visible
									to other players,
								</span>
								&nbsp;not attached to your body with tape,
								string, or on clothing (pocket) etc.
							</li>
							<li>
								If you forget to bring or lose your spoon, you
								will run the risk of being tagged at any time.
							</li>
							<li>
								Only the spoon you are given at the beginning of
								the game keeps you safe from being tagged.
							</li>
							<li>
								Once you are tagged, please turn-in your spoon
								to the front office so that we can use them
								again next year.
							</li>
						</ul>
					</li>
					<li>
						Do not attempt to gain an unfair advantage in any way.
						Doing so will result in removal from the game.
					</li>
					<li>
						Any disagreements among players will result in the
						removal of both parties.
					</li>
					<li>
						By agreeing to these rules you are giving permission for
						the use of your picture and name.
					</li>
				</ol>
			</div>
			<Footer />
		</div>
	);
}

export function getStaticProps() {
	return {
		props: {
			title: "Rules",
		},
	};
}
