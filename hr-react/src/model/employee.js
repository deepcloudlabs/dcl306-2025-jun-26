class Employee {
    constructor({identityNo, fullname, iban, photo, birthYear, salary, department, fulltime}) {
        this.identityNo = identityNo;
        this.fullname = fullname;
        this.iban = iban;
        this.photo = photo;
        this.birthYear = birthYear;
        this.salary = salary;
        this.department = department;
        this.fulltime = fulltime;
    }

};

export default Employee;
