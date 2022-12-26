import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Link from "next/link";
import StatBox from "../components/statBox";

export default function Home() {
    return (
        <div className="min-h-screen">
            <NavBar />
            <div className="m-5 text-white">
                <div className="mt-5 flex flex-col justify-center">
                    <div className="justify-center text-center font-sans">
                        <h2 className="font-semibold">
                            Cheyenne Mountain High School
                        </h2>
                        <h1 className="text-8xl font-extrabold">Spoon Game</h1>
                    </div>

                    <br className="my-10" />

                    <div className="flex flex-col items-center justify-center">
                        <p className="font-xs text-gray-300">
                            Let's be real. There's only one reason that you're
                            here...
                        </p>
                        <Link href="/tag-report">
                            <button className="w-50 mt-5 rounded-md border-2 border-indigo-600 bg-indigo-600 py-3 px-8 text-xl font-medium text-white duration-150 hover:bg-transparent">
                                Tag Someone
                            </button>
                        </Link>
                    </div>

                    <br className="my-5" />

                    <div className="mx-32 my-10 rounded-xl border-2 border-neutral-200 bg-neutral-900 p-5">
                        <div className="grid grid-cols-4 gap-10">
                            <div>{StatBox("Testing", 43, 1)}</div>
                            <div className="col-span-2">
                                {StatBox("Testing2", 44, 2)}
                            </div>
                            <div>{StatBox("Testing3", 45, 1)}</div>
                            <div>{StatBox("Testing4", 46, 1)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
