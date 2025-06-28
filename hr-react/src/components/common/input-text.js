export default function InputText({id, explain, label, value, handleChange}) {
    return (
        <div className={"form-group"}>
            <label htmlFor={id} className={"form-label"}>{label}:</label>
            <input type={"text"}
                   id={id}
                   name={id}
                   value={value}
                   onChange={handleChange}
                   placeholder={explain}
                   className={"form-control"}
            ></input>
        </div>
    )
}