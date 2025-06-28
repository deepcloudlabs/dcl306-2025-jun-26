import Container from "./components/common/container";
import InputText from "./components/common/input-text";
import Button from "./components/common/button";
import SelectBox from "./components/common/select-box";
import CheckBox from "./components/common/check-box";
import Photo from "./components/common/photo";
import Card from "./components/common/card";
import {useDepartments, useEmployee, useHrDispatcher} from "./providers/hr-provider";

function HrApp() {
  const hrDispatcher = useHrDispatcher();
  const findEmployeeById = () => {}
  const hireEmployee = () => {}
  const fireEmployee = () => {}
  const updateEmployee = () => {}
  const handlePhotoChange = () => {}
  const handleCheckBoxChange= () => {}
  const handleInputChange= (event) => {
    hrDispatcher({type: "INPUT_CHANGED", value: event.target.value, name: event.target.name});
  }
  const employee = useEmployee();
  const departments = useDepartments();

  return (
    <Container>
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
                     placeholder={"Enter full name"}
                     handleChange={handleInputChange}
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
        </Card>
    </Container>
  );
}

export default HrApp;
