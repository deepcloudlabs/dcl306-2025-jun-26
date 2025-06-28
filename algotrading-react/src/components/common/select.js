import React from "react";

export default function Select({id,label, value,handleChange,optionValues}) {
    return (
        <>
            <label htmlFor={id} className={"form-label"}>{label}:</label>
            <select id={id}
                    value={value}
                    onChange={handleChange}
                    className={"form-select"}>
                {
                    optionValues.map((opt,index) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))
                }
            </select>
        </>
    )
}