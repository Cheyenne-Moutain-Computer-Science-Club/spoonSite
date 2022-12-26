import React from "react";

// Size param is an int (likely between 1 & 3 inclusive): 2 would be equivalent to 2 squares
export default function StatBox(statName, number, size) {
    return (
        <div className={`h-40 w-${40 * size} rounded-3xl bg-gray-800`}>
            <h1>{statName}</h1>
            <h2>{number}</h2>
        </div>
    );
}
