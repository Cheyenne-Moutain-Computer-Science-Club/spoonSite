import React from "react";
import { useState } from "react";

export default function TFAStyleInput() {
    const [values, setValues] = useState(["", "", "", "", "", "", "", ""]);
    const [combinedInput, setCombinedInput] = useState();

    function handleChange(event, index) {
        const newValues = [...values];
        const value = event.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            newValues[index] = value;
            setValues(newValues);
        }

        if (index < values.length - 1 && value.length > 0) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            nextInput.focus();
        }

        // Set new combined value
        let newCombinedValue = values;
        newCombinedValue = newCombinedValue.join("");
        setCombinedInput(newCombinedValue);
    }

    return (
        <div className="flex justify-center">
            <div className="whitespace-nowrap">
                {values.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        id={`input-${index}`}
                        onChange={(event) => handleChange(event, index)}
                        className="m-5 w-20 rounded-2xl bg-gray-800 py-6 text-center text-white"
                    />
                ))}
            </div>
        </div>
    );
}
