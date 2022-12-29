import React from "react";
// import Image from "next/image";

export default function SingleBox(stat, num) {
    return (
        <div className="md:h-24 md:w-24 rounded-3xl bg-gray-800 shadow-xl lg:h-40 lg:w-40">
            <div className="flex flex-col p-4">
                <div>
                    <h1 className="text-2xl font-black lg:text-5xl">{num}</h1>
                    <h2 className="text-xs font-semibold lg:text-lg">{stat}</h2>
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
