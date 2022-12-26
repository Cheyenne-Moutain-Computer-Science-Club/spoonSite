import React from "react";

export default function DoubleBox(stat1, stat2, num1, num2) {
    return (
        <div className="h-40 w-80 rounded-3xl bg-gray-800 shadow-xl">
            <div className="grid grid-cols-2 divide-x">
                <div className="p-4 text-red-500">
                    <h1 className="text-5xl font-black">{num1}</h1>
                    <h2 className="font-semibold">{stat1}</h2>
                </div>
                <div className="p-4 text-green-500">
                    <h1 className="text-5xl font-black">{num2}</h1>
                    <h2 className="font-semibold">{stat2}</h2>
                </div>
            </div>
        </div>
    );
}
