export default function Card({title,children}) {
    //console.log("Card::render");
    return (
      <div className={"card"}>
          <div className={"card-header"}>
            <h3 className={"card-title"}>{title}</h3>
          </div>
          <div className={"card-body"}>{children}</div>
      </div>
    );
}
