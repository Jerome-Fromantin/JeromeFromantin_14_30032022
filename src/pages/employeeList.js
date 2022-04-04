import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'
// Imports to use the table in the page.
import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
//import { usePagination, useSortBy } from 'react-table'

// Use of styled components.
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`
const AboveTable = styled.div`
    display: flex;
    justify-content: space-between;
    width: 65%;
    margin-top: 20px;
`
const Input = styled.input`
    border: 1px black solid;
    border-radius: 5px;
`
const Table = styled.table`
    width: 65%;
    border-collapse: collapse;
    margin-top: 20px;
`
const Headers = styled.th`
    padding-bottom: 10px;
`
const Tbody = styled.tbody`
    background: rgb(240, 240, 240);
    border: 1px black solid;
    border-left: none;
    border-right: none;
`
const BodyCell = styled.td`
    text-align: center;
    padding: 10px;
`

const EmployeeList = () => {
    // Temporary fake data to test the table in the page.
    const data = useMemo(() => [
        {
            firstName: "Jérôme",
            lastName: "Fromantin",
            startDate: "03/18/2021",
            department: "Sales",
            birthDate: "07/23/1971",
            street: "Wisteria Lane",
            city: "Fairview",
            state: "California",
            zipCode: "87000"
        },
        {
            firstName: "Annie",
            lastName: "Versaire",
            startDate: "01/01/2022",
            department: "Human Resources",
            birthDate: "11/02/1968",
            street: "5th Avenue",
            city: "New York",
            state: "New York",
            zipCode: "75120"
        }
    ], [])

    // Columns of the table.
    const columns = useMemo(() => [
        {
            Header: "First Name",
            accessor: "firstName", // "accessor" is the "key" in the data.
        },
        {
            Header: "Last Name",
            accessor: "lastName",
        },
        {
            Header: "Start Date",
            accessor: "startDate",
        },
        {
            Header: "Department",
            accessor: "department",
        },
        {
            Header: "Date of Birth",
            accessor: "birthDate",
        },
        {
            Header: "Street",
            accessor: "street",
        },
        {
            Header: "City",
            accessor: "city",
        },
        {
            Header: "State",
            accessor: "state",
        },
        {
            Header: "Zip Code",
            accessor: "zipCode",
        }
    ], [])

    // NOTE : "data" and "columns" are necessary words. It won't work without them !!

    // We use the hook "useTable" with the data and the columns defined above to create a table instance.
    //const tableInstance = useTable({columns, data})
    
    const tableInstance = useTable({columns, data}, useSortBy)

    // CI-DESSOUS, VERSION AVEC PAGINATION ET RANGEMENT DES LIGNES.
    //const tableInstance = useTable({columns, data}, usePagination, useSortBy)

    // We define the props we will use in the table.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    // This function checks if the table is empty.
    function emptyTable() {
        if (rows.length === 0) {
             return (<tr><BodyCell colSpan={9}>No data available in table.</BodyCell></tr>)
        }
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>HRnet - Current Employees</title>
            </Helmet>
            <Container id="employee-div">
                <h1>Current Employees</h1>
                <table id="employee-table" className="display"></table>
                {/* Above is the original table, now invisible. */}

                {/* Lien de la doc : https://react-table.tanstack.com/docs/overview */}

                <AboveTable>
                    <div>
                        Show&nbsp;
                        <select name="entries" id="entries">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        &nbsp;entries
                    </div>
                    <div>Search: <Input type="text"/></div>
                </AboveTable>

                {/* Below is the structure and the style of the table. */}
                {/* Apply the table props. */}
                <Table {...getTableProps()}>
                    <thead>
                        {// Loop over the header rows.
                        headerGroups.map(headerGroup => (
                            // Apply the header row props.
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row.
                                headerGroup.headers.map(column => (
                                    // Apply the sorting props to control sorting.
                                    // Apply the header cell props.
                                    <Headers {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {// Render the header.
                                        column.render("Header")}
                                        {/* Add a sort direction indicator. TO MODIFY !! */}
                                        <span>
                                            {column.isSorted ? column.isSortedDesc ? "+-" : "-+" : ""}
                                        </span>
                                    </Headers>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* Apply the table body props. */}
                    <Tbody {...getTableBodyProps()}>
                        {emptyTable()}
                        {// Loop over the table rows.
                        rows.map(row => {
                            // Prepare the row for display.
                            prepareRow(row)
                            return (
                                // Apply the row props.
                                <tr {...row.getRowProps()}>
                                    {// Loop over the rows cells.
                                    row.cells.map(cell => {
                                        // Apply the cell props.
                                        return (
                                            <BodyCell {...cell.getCellProps()}>
                                                {// Render the cell contents.
                                                cell.render("Cell")}
                                            </BodyCell>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </Tbody>
                </Table>

                <Link to="/" style={{marginTop: "40px"}}>Home</Link>
                
                <p>Ci-dessus, tableau à tester et modifier pour être le futur tableau.</p>
            </Container>
        </HelmetProvider>)
}

export default EmployeeList
