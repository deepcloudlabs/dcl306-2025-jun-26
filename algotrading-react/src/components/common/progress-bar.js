export default function ProgressBar({value,min,max}) {
    let percent = (value - min)* 100 / (max - min);
    let bgColor = "bg-primary";
    if (percent < 33)
        bgColor = "bg-danger";
    else if (percent < 66)
        bgColor = "bg-warning";
    return (
        <div className={"progress"}>
            <div className={"progress-bar ".concat(bgColor)}
                 style={{width: `${percent}%`}}>{value}</div>
        </div>
    );
}