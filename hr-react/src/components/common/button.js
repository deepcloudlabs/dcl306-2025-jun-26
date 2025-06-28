import React from "react";

export default function Button(props) {
    return(
        <button className={"btn ".concat(props.color)}
                onClick={props.click}>{props.label}
        </button>
    );
}