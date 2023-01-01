import React from "react";
import { Nabla } from "@next/font/google";

const nabla = Nabla({ subsets: ["latin"] });

export default function PageTitle(text) {
    return (
        <div>
            <div className={nabla.className}>
                <h1 className="inline-block border-b-8 border-dashed border-amber-400 p-4 text-6xl font-black tracking-widest">
                    {text}
                </h1>
            </div>
        </div>
    );
}
