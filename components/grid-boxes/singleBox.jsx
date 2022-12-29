import React from "react";
// import Image from "next/image";

export default function SingleBox(stat, num) {
    return (
        <div className="h-52 w-52 rounded-3xl border-2 border-neutral-300 bg-gray-800 shadow-xl md:h-24 md:w-24 md:border-0 lg:h-40 lg:w-40">
            <div className="flex flex-col p-4">
                <div>
                    <h1 className="text-7xl font-black md:text-2xl lg:text-5xl">
                        {num}
                    </h1>
                    <h2 className="text-md font-semibold md:text-xs lg:text-lg">
                        {stat}
                    </h2>
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
