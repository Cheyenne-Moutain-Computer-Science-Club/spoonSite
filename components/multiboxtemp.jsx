import React from "react";
import { useState } from "react";

export default function MultiBoxTemp() {
    const [values, setValues] = useState(["", "", "", "", "", "", "", ""]);

    function handleChange(event, index) {
        const newValues = [...values];
        newValues[index] = event.target.value.slice(0, 1);
        setValues(newValues);

        if (index < values.length - 1) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            nextInput.focus();
        }
    }

    return (
        <div className="flex justify-center">
            {values.map((value, index) => (
                <input
                    key={index}
                    className="mx-1 rounded-lg px-4 py-3 shadow-lg"
                    type="number"
                    min="0"
                    max="9"
                    value={value}
                    id={`input-${index}`}
                    onChange={(event) => handleChange(event, index)}
                />
            ))}
        </div>
    );
}
