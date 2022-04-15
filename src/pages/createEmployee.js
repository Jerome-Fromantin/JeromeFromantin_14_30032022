import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import '../index.css'
// Import to use the select library in the page.
import Select from 'react-select'
// Import to use my own dropdown in the page.
import Dropdown from '../components/Dropdown'

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
    const [stateSelectedOption, setStateSelectedOption] = useState(null)
    const [zipCodeInputValue, setZipCodeInputValue] = useState("")
    const [deptSelectedOption, setDeptSelectedOption] = useState(null)
    // The different "useState" above allow to keep the data of the different fields in the form.

    // This function (TO FINISH !!) displays an error message when a value in a field is invalid
    // or a success message when everything is fine.
    // WHEN SUCCESSFUL, THE MESSAGE SHOULD BE ON A MODAL WINDOW, NOT ON ALERT !!!
    // MOREOVER, THE FUNCTION MUST PUT THE NEW DATA IN THE DATA BASE !
    function saveEmployee() {
        // Conditions used : If there is 0 or 1 character OR if there is a number.
        if (firstNameInputValue.length < 2 || !/^[^\d]+$/.test(firstNameInputValue)) {
            alert("The first name field is invalid.")
        }
        else if (lastNameInputValue.length < 2 || !/^[^\d]+$/.test(lastNameInputValue)) {
            alert("The last name field is invalid.")
        }
        else if (birthDateInputValue === "") {
            alert("The birth date field is empty.")
        }
        else if (startDateInputValue === "") {
            alert("The start date field is empty.")
        }
        else if (streetInputValue.length < 2) {
            alert("The street field is invalid.")
        }
        else if (cityInputValue === "" || !/^[^\d]+$/.test(cityInputValue)) {
            alert("The city field is invalid.")
        }
        else if (stateSelectedOption === null) {
            alert("The state field is empty.")
        }
        // Conditions used : If the field is empty OR if the number is less than 5 digits long
        // OR if the number is more than 5 digits long.
        else if (zipCodeInputValue === "" || zipCodeInputValue < 10000 || zipCodeInputValue >= 100000) {
            alert("The zip code field is invalid.")
        }
        else if (deptSelectedOption === null) {
            alert("The department field is empty.")
        }
        // Ici, lancer la modale avec le message plutôt qu'une boite d'alerte...
        else {alert("Employee Created!")}
    }

    // Customization of the input in the <Datetime/> component.
    let inputProps = {
        className: "dateLib"
    }

    // Data for the imported selects.
    const stateOptions = [
        {value: "alabama", label: "Alabama"},
        {value: "alaska", label: "Alaska"},
        {value: "american samoa", label: "American Samoa"},
        {value: "arizona", label: "Arizona"},
        {value: "arkansas", label: "Arkansas"},
        {value: "california", label: "California"},
        {value: "colorado", label: "Colorado"},
        {value: "connecticut", label: "Connecticut"},
        {value: "delaware", label: "Delaware"},
        {value: "district of columbia", label: "District Of Columbia"},
        {value: "federated states of micronesia", label: "Federated States Of Micronesia"},
        {value: "florida", label: "Florida"},
        {value: "georgia", label: "Georgia"},
        {value: "guam", label: "Guam"},
        {value: "hawaii", label: "Hawaii"},
        {value: "idaho", label: "Idaho"},
        {value: "illinois", label: "Illinois"},
        {value: "indiana", label: "Indiana"},
        {value: "iowa", label: "Iowa"},
        {value: "kansas", label: "Kansas"},
        {value: "kentucky", label: "Kentucky"},
        {value: "louisiana", label: "Louisiana"},
        {value: "maine", label: "Maine"},
        {value: "marshall islands", label: "Marshall Islands"},
        {value: "maryland", label: "Maryland"},
        {value: "massachusetts", label: "Massachusetts"},
        {value: "michigan", label: "Michigan"},
        {value: "minnesota", label: "Minnesota"},
        {value: "mississippi", label: "Mississippi"},
        {value: "missouri", label: "Missouri"},
        {value: "montana", label: "Montana"},
        {value: "nebraska", label: "Nebraska"},
        {value: "nevada", label: "Nevada"},
        {value: "new hampshire", label: "New Hampshire"},
        {value: "new jersey", label: "New Jersey"},
        {value: "new mexico", label: "New Mexico"},
        {value: "new york", label: "New York"},
        {value: "north carolina", label: "North Carolina"},
        {value: "north dakota", label: "North Dakota"},
        {value: "northern mariana islands", label: "Northern Mariana Islands"},
        {value: "ohio", label: "Ohio"},
        {value: "oklahoma", label: "Oklahoma"},
        {value: "oregon", label: "Oregon"},
        {value: "palau", label: "Palau"},
        {value: "pennsylvania", label: "Pennsylvania"},
        {value: "puerto rico", label: "Puerto Rico"},
        {value: "rhode island", label: "Rhode Island"},
        {value: "south carolina", label: "South Carolina"},
        {value: "south dakota", label: "South Dakota"},
        {value: "tennessee", label: "Tennessee"},
        {value: "texas", label: "Texas"},
        {value: "utah", label: "Utah"},
        {value: "vermont", label: "Vermont"},
        {value: "virgin islands", label: "Virgin Islands"},
        {value: "virginia", label: "Virginia"},
        {value: "washington", label: "Washington"},
        {value: "west virginia", label: "West Virginia"},
        {value: "wisconsin", label: "Wisconsin"},
        {value: "wyoming", label: "Wyoming"}
    ]
    const deptOptions = [
        {value: "sales", label: "Sales"},
        {value: "marketing", label: "Marketing"},
        {value: "engineering", label: "Engineering"},
        {value: "human resources", label: "Human Resources"},
        {value: "legal", label: "Legal"}
    ]

    // Styles for the imported selects.
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "black" : "rgb(240, 240, 240)",
            color: state.isSelected ? "white" : "black",
            fontSize: "16px",
            borderBottom: "1px black solid",
            ":hover": {
                backgroundColor: "rgb(200, 200, 255)",
                color: "black"
            }
        }),
        control: () => ({
            // None of react-select's styles are passed to <Control/>.
            display: "flex",
            backgroundColor: "rgb(240, 240, 240)",
            width: "260px",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            fontSize: "16px",
            border: "1px black solid",
            borderRadius: "5px"
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
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
                        
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input type="text" id="last-name" value={lastNameInputValue}
                        onChange={(e) => setLastNameInputValue(e.target.value)}/>

                        <Label htmlFor="date-of-birth">Date of Birth</Label>
                        <Datetime id="date-of-birth" inputProps={inputProps} value={birthDateInputValue}
                        onChange={(value) => setBirthDateInputValue(value)} closeOnSelect={true} timeFormat={false}
                        dateFormat="DD/MM/YYYY"/>
                        {/* "inputProps" allows to customize the appearance of the input,
                        "closeOnSelect" closes the picker when a day is clicked upon,
                        "timeFormat" hides the time of the day in the picker and in the input and
                        "dateFormat" sets the order of the numbers in the date.*/}

                        <Label htmlFor="start-date">Start Date</Label>
                        <Datetime id="start-date" inputProps={inputProps} value={startDateInputValue}
                        onChange={(value) => setStartDateInputValue(value)} closeOnSelect={true} timeFormat={false}
                        dateFormat="DD/MM/YYYY"/>

                        <Fieldset className="address">
                            <legend>Address</legend>

                            <Label htmlFor="street">Street</Label>
                            <Input type="text" id="street" value={streetInputValue}
                            onChange={(e) => setStreetInputValue(e.target.value)}/>

                            <Label htmlFor="city">City</Label>
                            <Input type="text" id="city" value={cityInputValue}
                            onChange={(e) => setCityInputValue(e.target.value)}/>

                            <Label htmlFor="state">State</Label>
                            <Select options={stateOptions} defaultValue={stateSelectedOption}
                            onChange={setStateSelectedOption} menuPlacement="bottom"
                            id="state" styles={customStyles}/>

                            <Label htmlFor="zip-code">Zip Code</Label>
                            <Input type="number" id="zip-code" value={zipCodeInputValue}
                            onChange={(e) => setZipCodeInputValue(e.target.value)}/>
                        </Fieldset>

                        <Label htmlFor="department">Department</Label>
                        <Select options={deptOptions} defaultValue={deptSelectedOption}
                        onChange={setDeptSelectedOption} menuPlacement="top"
                        id="department" styles={customStyles}/>
                    </form>

                    <Button onClick={saveEmployee}>Save</Button>

                    <p>Ci-dessous, menu déroulant à venir...</p>
                    <Dropdown/>
                </Container>
                {/*<div id="confirmation" className="modal">Employee Created!</div>*/}
            </main>
        </HelmetProvider>
    )
}

export default CreateEmployee
