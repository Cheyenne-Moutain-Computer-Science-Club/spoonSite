import React from "react";

export default function DoubleBox(stat1, stat2, num1, num2) {
    return (
        <div className="h-24 w-48 rounded-3xl bg-gray-800 shadow-xl lg:h-40 lg:w-80">
            <div className="grid grid-cols-2 divide-x">
                <div className="p-4 text-red-500">
                    <h1 className="text-2xl font-black lg:text-5xl">{num1}</h1>
                    <h2 className="text-xs font-semibold lg:text-lg">
                        {stat1}
                    </h2>
                </div>
                <div className="p-4 text-green-500">
                    <h1 className="text-2xl font-black lg:text-5xl">{num2}</h1>
                    <h2 className="text-xs font-semibold lg:text-lg">
                        {stat2}
                    </h2>
                </div>
            </div>
        </div>
    );
}
