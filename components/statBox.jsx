import React from "react";

export default function StatBox(statName, number) {
    return (
        <div className="h-40 w-40 rounded-3xl bg-gray-800">
            <h1>{statName}</h1>
            <h2>{number}</h2>
        </div>
    );
}
