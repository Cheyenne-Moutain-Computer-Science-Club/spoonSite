import React from "react";

export default function SingleBox(stat, num) {
    return (
        <div className="h-40 w-40 rounded-3xl bg-gray-800 shadow-xl">
            <div className="p-4 align-middle">
                <div>
                    <h1 className="text-5xl font-black">{num}</h1>
                    <h2 className="font-semibold">{stat}</h2>
                </div>
            </div>
        </div>
    );
}
