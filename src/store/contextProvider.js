import { useState } from 'react'
import EmployeeContext from './context'
import { getEmployee, addNewEmployee } from './store'

const ContextProvider = (props) => {
    const [employee, setEmployee] = useState(getEmployee())

    function addEmployee(newEmployee) {
        addNewEmployee(newEmployee)
        setEmployee([newEmployee, ...employee])
    }

    return <EmployeeContext.Provider value={{employee, addEmployee}}>{props.children}</EmployeeContext.Provider>
}

export default ContextProvider