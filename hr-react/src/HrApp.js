import Container from "./components/common/container";
import InputText from "./components/common/input-text";
import Button from "./components/common/button";
import SelectBox from "./components/common/select-box";
import CheckBox from "./components/common/check-box";
import Photo from "./components/common/photo";
import Card from "./components/common/card";
import {useDepartments, useEmployee, useEmployees, useHrDispatcher, useNames} from "./providers/hr-provider";
import Badge from "./components/common/badge";

function HrApp() {
    const hrDispatcher = useHrDispatcher();
    const employee = useEmployee();
    const employees = useEmployees();
    const departments = useDepartments();
    const names = useNames();

    const copyRow = (row) =>  {
        hrDispatcher({type: "COPY_ROW", value: row});
    };
    const retrieveEmployees = () => {
        fetch(`http://localhost:4001/employees`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            }
        }).then(res => res.json())
            .then(fetchedEmployees => {
                hrDispatcher({type: "EMPLOYEES_FETCHED", value: fetchedEmployees});
            })

    }
    const findEmployeeById = () => {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            }
        }).then(res => res.json())
            .then(fetchedEmployee => {
                hrDispatcher({type: "EMPLOYEE_FETCHED", value: fetchedEmployee});
            })
    }
    const hireEmployee = () => {
        const employeeResource = {...employee, _id: employee.identityNo};
        fetch("http://localhost:4001/employees", {
            method: "POST",
            body: JSON.stringify(employeeResource),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                hrDispatcher({type: "EMPLOYEE_HIRED", value: response.nModified > 0 ? "OK" : "FAILED"});
            });
    }
    const fireEmployee = (id) => {
        id = id ?? employee.identityNo;
        fetch(`http://localhost:4001/employees/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            }
        }).then(res => res.json())
            .then(firedEmployee => {
                hrDispatcher({type: "EMPLOYEE_FIRED", value: firedEmployee});
            })
    }
    const updateEmployee = () => {
        const employeeResource = {...employee, _id: employee.identityNo};
        fetch(`http://localhost:4001/employees`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeResource)
        }).then(res => res.json())
            .then(response => {
                hrDispatcher({type: "EMPLOYEE_UPDATED", value: response.status});
            });
    };

    const handlePhotoChange = (imageData) => {
        hrDispatcher({type: "PHOTO_CHANGED", value: imageData, name: "photo"});
    }
    const handleCheckBoxChange = (event) => {
        hrDispatcher({type: "CHECK_CHANGED", value: event.target.checked, name: event.target.name});
    }
    const handleInputChange = (event) => {
        hrDispatcher({type: "INPUT_CHANGED", value: event.target.value, name: event.target.name});
    }

    const handleInputChangeWithSuggestions = (event) => {
        if (employee.fullname.length > 2){
            fetch(`http://localhost:4001/employees/names?starts=${employee.fullname}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            }).then(res => res.json())
                .then(names => {
                    hrDispatcher({type: "SUGGESTIONS_RECEIVED", value: names});
                })

        }
        hrDispatcher({type: "INPUT_CHANGED", value: event.target.value, name: event.target.name});
    }
    return (
        <Container>
            <datalist id="names">
                {
                    names.map(name => (
                        <option value={name}/>

                    ))
                }
            </datalist>
            <p></p>
            <Card title={"Employee"}>
                <InputText value={employee.identityNo}
                           id={"identityNo"}
                           placeholder={"Enter a valid identity no"}
                           handleChange={handleInputChange}
                           label={"Identity No"}/>
                <Button click={findEmployeeById}
                        color={"btn-primary"}
                        label={"Find"}></Button>
                <Button click={fireEmployee}
                        color={"btn-danger"}
                        label={"Fire"}></Button>
                <InputText value={employee.fullname}
                           id={"fullname"}
                           datalist={"names"}
                           placeholder={"Enter full name"}
                           handleChange={handleInputChangeWithSuggestions}
                           autocomplete="on"
                           label={"Full Name"}/>
                <InputText value={employee.iban}
                           id={"iban"}
                           placeholder={"Enter a valid iban"}
                           handleChange={handleInputChange}
                           label={"IBAN"}/>
                <InputText value={employee.salary}
                           id={"salary"}
                           placeholder={"Enter salary"}
                           handleChange={handleInputChange}
                           label={"Salary"}/>
                <InputText value={employee.birthYear}
                           id={"birthYear"}
                           placeholder={"Enter birth year"}
                           handleChange={handleInputChange}
                           label={"Birth Year"}/>
                <SelectBox id={"department"}
                           label={"Department"}
                           value={employee.department}
                           handleChange={handleInputChange}
                           optionValues={departments}
                />
                <CheckBox value={employee.fulltime}
                          id={"fulltime"}
                          handleChange={handleCheckBoxChange}
                          label={"Full time?"}/>
                <Photo value={employee.photo}
                       id={"photo"}
                       handleChange={handlePhotoChange}
                       label={"Photo"}/>
                <Button click={hireEmployee}
                        color={"btn-warning"}
                        label={"Hire"}></Button>
                <Button click={updateEmployee}
                        color={"btn-success"}
                        label={"Update"}></Button>
                <Button click={retrieveEmployees}
                        color={"btn-success"}
                        label={"Retrieve Employees"}></Button>

            </Card>
            <Card title={"Employees"}>
                <table className={"table table-striped table-hover table-bordered table-responsive"}>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Identity No</th>
                        <th>Photo</th>
                        <th>Fullname</th>
                        <th>Salary</th>
                        <th>IBAN</th>
                        <th>Department</th>
                        <th>Birth Year</th>
                        <th>Fulltime?</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map((emp,index) => (
                            <tr onClick={() => copyRow(emp) } key={emp.identityNo}>
                                <td>{index+1}</td>
                                <td>{emp.identityNo}</td>
                                <td><img src={emp.photo} style={{width: "64px"}} alt={"Photo"}/></td>
                                <td>{emp.fullname}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.iban}</td>
                                <td><span className={"badge bg-warning"}>{emp.department}</span></td>
                                <td>{emp.birthYear}</td>
                                <td><span className={"badge bg-info"}>{emp.fulltime ? "FULL-TIME" : "PART-TIME"}</span></td>
                                <td><Button color={"bg-danger"} label={"Fire"} click={()=>fireEmployee(emp.identityNo)}/></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </Card>
        </Container>
    );
}

export default HrApp;
