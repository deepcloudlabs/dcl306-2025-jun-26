export default function Table({headers,values,fields,keyField}) {
    //console.log("Table::render");
    return (
        <table className="table table-striped table-bordered table-responsive table-hover">
            <thead>
            <tr>
                {
                    headers.map(header => (
                        <th key={header}>{header}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                values.map((value, index) => ( // View
                    <tr key={index}>
                        {
                            fields.map((field,fieldIndex) => (
                                <td key={value[keyField]*fieldIndex}>{value[field]}</td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}
