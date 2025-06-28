
export default function Container({ children }) {
    //console.log("Container::render");
    return(
        <div className="container">
            {children}
        </div>
    ) ;
}
