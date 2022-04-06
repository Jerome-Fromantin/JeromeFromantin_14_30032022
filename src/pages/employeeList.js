import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'
// Imports to use the table in the page.
import { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import FakeData from '../source/fakeData'

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
    width: 80%;
    margin-top: 20px;
`
const Input = styled.input`
    border: 1px black solid;
    border-radius: 5px;
`
const Table = styled.table`
    width: 80%;
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
const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 20px;
`
const Pagispan = styled.span`
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
    &.disabled {
        color: gray;
        font-weight: normal;
    }
`

const EmployeeList = () => {
    // Fake data to use the table in the page.
    const data = useMemo(() => FakeData, [])

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
    // In this first hook, we add the hooks we need to have more functionalities.
    const tableInstance = useTable(
        {columns, data, initialState: {pageIndex: 0, rowIndex: 0}},
        useSortBy, usePagination
    )

    // We define the props we will use in the table.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        //rows, // Without pagination.
        page, // "page" has only the rows for the active page.
        prepareRow,
        // The following are used for pagination.
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        pageOptions,
        setPageSize,
        state: {pageSize, pageIndex, rowIndex}
        // Above can be replaced by "state: {pageIndex, pageSize}" to display the number of the page.
    } = tableInstance

    // This function checks if the table is empty.
    function emptyTable() {
        if (page.length === 0) {
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
                        <select name="entries" id="entries" value={pageSize}
                        onChange={e => {setPageSize(Number(e.target.value))}}>
                            {[2, 3, 4, 10, 25, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>{pageSize}</option>
                            ))}
                        </select>
                        &nbsp;entries
                    </div>
                    <div>Search: <Input type="text"/></div>
                    {/* Pour Search, utiliser GlobalFilter. */}
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
                                        {/* Add a sort direction indicator. */}
                                        <span>
                                            {column.isSorted ? column.isSortedDesc ? "⬆️" : "⬇️" : "↕️"}
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
                        page.map((row, i) => {
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

                <Pagination>
                    {/*First possible display.
                    <div>Showing page {pageIndex + 1} of {pageOptions.length}</div>*/}
                    {pageOptions.length === 1 ? (
                        <div>Showing {page.length} of {page.length} entries</div>
                    ) : (
                        //<div>Showing {page.length} of ~{pageOptions.length * pageSize} entries</div>
                        <div>Showing {(pageIndex + 1) + pageIndex} to {(pageIndex + 1) * pageSize} of
                        ~{pageOptions.length * pageSize} entries</div>
                    )}
                    <div>
                        <Pagispan onClick={() => previousPage()}
                        className={`${canPreviousPage ? "active" : "disabled"}`}>Previous</Pagispan>
                        <Pagispan style={{marginLeft: "30px"}} onClick={() => nextPage()}
                        className={`${canNextPage ? "active" : "disabled"}`}>Next</Pagispan>
                    </div>
                </Pagination>

                <Link to="/" style={{marginTop: "40px"}}>Home</Link>
                
                <p>Ci-dessus, tableau à tester et modifier pour être le futur tableau.</p>
            </Container>
        </HelmetProvider>)
}

export default EmployeeList
