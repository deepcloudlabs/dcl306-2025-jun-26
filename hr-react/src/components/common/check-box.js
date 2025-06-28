import React from "react";

export default function CheckBox({id, label, value, handleChange}) {
    return(
        <div className={"form-group"}>
            <label htmlFor={id} className={"form-label"}>{label}:
                <input type={"checkbox"}
                       id={id}
                       name={id}
                       checked={value}
                       onChange={handleChange}
                       className={"form-check-input"}
                ></input>
            </label>
        </div>
    )
}
