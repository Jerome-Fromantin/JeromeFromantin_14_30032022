import { Helmet, HelmetProvider } from 'react-helmet-async'

const EmployeeList = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>HRnet - Current Employees</title>
            </Helmet>
            <h1>Current Employees</h1>
        </HelmetProvider>)
}

export default EmployeeList
