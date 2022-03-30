import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const Label = styled.label`
    display: block;
    margin-top: 1rem;
    margin-bottom: 10px;
`

const Fieldset = styled.fieldset`
    margin-top: 10px;
`

const Select = styled.select`
    width: 260px;
    font-size: 16px;
    padding: 5px 0 0 10px;
`

const CreateEmployee = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>HRnet</title>
            </Helmet>
            <main>
                <Title>
                    <h1>HRnet</h1>
                </Title>
                <Container>
                    <Link to="/employeeList">View Current Employees</Link>
                    <h2>Create Employee</h2>
                    <form action="#" id="create-employee">
                        <Label for="first-name">First Name</Label>
                        <input type="text" id="first-name" />

                        <Label for="last-name">Last Name</Label>
                        <input type="text" id="last-name" />

                        <Label for="date-of-birth">Date of Birth</Label>
                        <input id="date-of-birth" type="text" />

                        <Label for="start-date">Start Date</Label>
                        <input id="start-date" type="text" />

                        <Fieldset class="address">
                            <legend>Address</legend>

                            <Label for="street">Street</Label>
                            <input id="street" type="text" />

                            <Label for="city">City</Label>
                            <input id="city" type="text" />

                            <Label for="state">State</Label>
                            <Select name="state" id="state">
                                <option>Alabama</option>
                                <option>Alaska</option>
                                <option>American Samoa</option>
                                <option>Arizona</option>
                                <option>Arkansas</option>
                                <option>California</option>
                                <option>Colorado</option>
                                <option>Connecticut</option>
                                <option>Delaware</option>
                                <option>District Of Columbia</option>
                                <option>Federated States Of Micronesia</option>
                                <option>Florida</option>
                                <option>Georgia</option>
                                <option>Guam</option>
                                <option>Hawaii</option>
                                <option>Idaho</option>
                                <option>Illinois</option>
                                <option>Indiana</option>
                                <option>Iowa</option>
                                <option>Kansas</option>
                                <option>Kentucky</option>
                                <option>Louisiana</option>
                                <option>Maine</option>
                                <option>Marshall Islands</option>
                                <option>Maryland</option>
                                <option>Massachusetts</option>
                                <option>Michigan</option>
                                <option>Minnesota</option>
                                <option>Mississippi</option>
                                <option>Missouri</option>
                                <option>Montana</option>
                                <option>Nebraska</option>
                                <option>Nevada</option>
                                <option>New Hampshire</option>
                                <option>New Jersey</option>
                                <option>New Mexico</option>
                                <option>New York</option>
                                <option>North Carolina</option>
                                <option>North Dakota</option>
                                <option>Northern Mariana Islands</option>
                                <option>Ohio</option>
                                <option>Oklahoma</option>
                                <option>Oregon</option>
                                <option>Palau</option>
                                <option>Pennsylvania</option>
                                <option>Puerto Rico</option>
                                <option>Rhode Island</option>
                                <option>South Carolina</option>
                                <option>South Dakota</option>
                                <option>Tennessee</option>
                                <option>Texas</option>
                                <option>Utah</option>
                                <option>Vermont</option>
                                <option>Virgin Islands</option>
                                <option>Virginia</option>
                                <option>Washington</option>
                                <option>West Virginia</option>
                                <option>Wisconsin</option>
                                <option>Wyoming</option>
                            </Select>

                            <Label for="zip-code">Zip Code</Label>
                            <input id="zip-code" type="number" />
                        </Fieldset>

                        <Label for="department">Department</Label>
                        <Select name="department" id="department">
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </Select>
                    </form>

                    <button onclick="saveEmployee()">Save</button>
                </Container>
                <div id="confirmation" class="modal">Employee Created!</div>
            </main>
        </HelmetProvider>
    )
}

export default CreateEmployee
