import React from "react";
import Image from "next/image";

export default function SingleBox(stat, num) {
    return (
        <div className="h-40 w-40 rounded-3xl bg-gray-800 shadow-xl">
            <div className="flex flex-col p-4">
                <div>
                    <h1 className="text-5xl font-black">{num}</h1>
                    <h2 className="font-semibold">{stat}</h2>
                </div>

                {/* <div className="mt-7 flex justify-end">
                    <Image
                        src="/icons/external.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                </div> */}
            </div>
        </div>
    );
}
