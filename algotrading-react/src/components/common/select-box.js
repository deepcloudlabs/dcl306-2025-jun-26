import React from "react";

export default function SelectBox({id, label, value, handleChange, optionValues}) {
    return (
        <div className={"form-group"}>
            <label htmlFor={id} className={"form-label"}>{label}:</label>
            <select id={id}
                    value={value}
                    name={id}
                    onChange={handleChange}
                    className={"form-select"}>
                {
                    optionValues.map((opt, index) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))
                }
            </select>
        </div>
    )
}
