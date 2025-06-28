export default function Photo({id, label, value, handleChange}){
    function handleFileChange(event){
        const fileReader = new FileReader();
        const fileName = event.target.files[0];
        fileReader.onload = (e) => {
            handleChange(e.target.result);
        }
        fileReader.readAsDataURL(fileName);
    }
    return(
        <div className={"form-group"}>
            <label htmlFor={id} className={"form-label"}>{label}:</label>
            <img src={value}
                 style={{width: "64px"}}
                 alt={"Photo"}/>
            <label>
                <input type={"file"}
                       onChange={handleFileChange}
                       style={{display: "none"}}></input>
                <span className={"btn btn-lg btn-primary"}>File</span>
            </label>

        </div>
    )
}
