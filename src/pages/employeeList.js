import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const EmployeeList = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>HRnet - Current Employees</title>
            </Helmet>
            <Container id="employee-div">
                <h1>Current Employees</h1>
                <table id="employee-table" className="display"></table>
                <Link to="/">Home</Link>
            </Container>
        </HelmetProvider>)
}

export default EmployeeList
