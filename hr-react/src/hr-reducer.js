export default function HrReducer(hrState, action) {
    // const newHrState = Object.assign({}, hrState);
    const newHrState = {...hrState};
    //newHrState.employee = Object.assign({},hrState.employee);
    newHrState.employee = {...hrState.employee};

    switch (action.type) {
        case "INPUT_CHANGED":
        case "CHECK_CHANGED":
        case "PHOTO_CHANGED":
            newHrState.employee[action.name] = action.value;
            break;
        case "EMPLOYEE_HIRED":
            alert(`EMPLOYEE_HIRED: ${action.value}`);
            break;
        case "EMPLOYEE_FETCHED":
            Object.assign(newHrState.employee, action.value);
            break;
        case "EMPLOYEE_UPDATED":
            alert(`EMPLOYEE_UPDATED: ${action.value}`);
            break;
    }
    return newHrState;
}
