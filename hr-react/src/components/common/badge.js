export default function Badge({isVisible,label,color,value}) {
    //console.log("Badge::render()")
    return(
        <>
        { isVisible && (<h4>{label}: <span className={"badge ".concat(color)}>{value}</span></h4>) }
        </>
    )
}
