import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'

// Use of styled components.
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
const borderStyle = `
    border: 1px black solid;
    border-radius: 5px;
`
const Input = styled.input`
    ${borderStyle}
    margin-right: 10px;
`
const Fieldset = styled.fieldset`
    ${borderStyle}
    margin-top: 10px;
`
const Select = styled.select`
    width: 260px;
    font-size: 16px;
    padding: 5px 0 0 10px;
    ${borderStyle}
`
const Button = styled.button`
    ${borderStyle}
    margin-top: 20px;
`

// This function allows to use React Devtools in Firefox.
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on && window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on()

const CreateEmployee = () => {
    const [firstNameInputValue, setFirstNameInputValue] = useState("")
    const [lastNameInputValue, setLastNameInputValue] = useState("")
    const [birthDateInputValue, setBirthDateInputValue] = useState("")
    const [startDateInputValue, setStartDateInputValue] = useState("")
    const [streetInputValue, setStreetInputValue] = useState("")
    const [cityInputValue, setCityInputValue] = useState("")
    // The different "useState" above allow to keep the data of the different fields in the form.

    // This function (to improve) displays an error message when a value in a field is invalid
    // or a success message when everything is fine.
    function saveEmployee2() {
        if (firstNameInputValue === "" || firstNameInputValue.length < 2 || !/^[^\d]+$/.test(firstNameInputValue)) {
            alert("The first name field is invalid.")
        }
        else if (lastNameInputValue === "" || lastNameInputValue.length < 2 || !/^[^\d]+$/.test(lastNameInputValue)) {
            alert("The last name field is invalid.")
        }
        else if (birthDateInputValue === "") {
            alert("The birth date field must use a React date picker still not set up.")
        }
        else if (startDateInputValue === "") {
            alert("The start date field must use a React date picker still not set up.")
        }
        else if (streetInputValue === "" || streetInputValue.length < 2) {
            alert("The street field is invalid.")
        }
        else if (cityInputValue === "" || !/^[^\d]+$/.test(cityInputValue)) {
            alert("The city field is invalid.")
        }
        else {alert("Employee Created!")}
    }
    
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
                        <Label htmlFor="first-name">First Name</Label>
                        <Input type="text" id="first-name" value={firstNameInputValue}
                        onChange={(e) => setFirstNameInputValue(e.target.value)}/><br/>
                    <Button onClick={saveEmployee2}>Save</Button>

                        <Label htmlFor="last-name">Last Name</Label>
                        <Input type="text" id="last-name" value={lastNameInputValue}
                        onChange={(e) => setLastNameInputValue(e.target.value)}/>

                        <Label htmlFor="date-of-birth">Date of Birth</Label>
                        <Input type="text" id="date-of-birth" value={birthDateInputValue}
                        onChange={(e) => setBirthDateInputValue(e.target.value)}/>

                        <Label htmlFor="start-date">Start Date</Label>
                        <Input type="text" id="start-date" value={startDateInputValue}
                        onChange={(e) => setStartDateInputValue(e.target.value)}/>

                        <Fieldset className="address">
                            <legend>Address</legend>

                            <Label htmlFor="street">Street</Label>
                            <Input type="text" id="street" value={streetInputValue}
                        onChange={(e) => setStreetInputValue(e.target.value)}/>

                            <Label htmlFor="city">City</Label>
                            <Input type="text" id="city" value={cityInputValue}
                        onChange={(e) => setCityInputValue(e.target.value)}/>

                            <Label htmlFor="state">State</Label>
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

                            <Label htmlFor="zip-code">Zip Code</Label>
                            <Input id="zip-code" type="number" />
                        </Fieldset>

                        <Label htmlFor="department">Department</Label>
                        <Select name="department" id="department">
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </Select>
                    </form>

                    {/*<Button onClick={saveEmployee}>Save</Button>*/}
                    <Button onClick={saveEmployee2}>Save</Button>
                </Container>
                {/*<div id="confirmation" className="modal">Employee Created!</div>*/}
            </main>
        </HelmetProvider>
    )
}

export default CreateEmployee
