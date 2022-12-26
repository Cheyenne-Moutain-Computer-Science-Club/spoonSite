import Footer from "../components/footer";
import NavBar from "../components/navbar";

export default function Home() {
    return (
        <div className="min-h-screen">
            <NavBar />
            <div className="text-white">
                <div className="mt-5 flex justify-center">
                    <div className="flex flex-col justify-center text-center font-sans">
                        <h2 className="font-semibold">
                            Cheyenne Mountain High School
                        </h2>
                        <h1 className="text-8xl font-extrabold">Spoon Game</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
