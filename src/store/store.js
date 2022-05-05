import FakeData from '../source/fakeData'

// Here, I use "sessionStorage" to keep in the browser the "FakeData" array and the new data added to it.
// These data will expire at the end of the session.
// If I want to keep them "for ever", I must replace "sessionStorage" by "localStorage".

export const getEmployee = () => {
    const employee = sessionStorage.getItem("whole")

    if(employee) {
        return JSON.parse(employee)
    }
    else {
        sessionStorage.setItem("whole", JSON.stringify(FakeData))
        return FakeData
    }
}

export const addNewEmployee = (newEmployee) => {
    const employee = getEmployee()

    employee.unshift(newEmployee)
    sessionStorage.setItem("whole", JSON.stringify(employee))
}