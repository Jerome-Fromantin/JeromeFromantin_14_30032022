import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'
import '../index.css'
import EmployeeContext from '../store/context';

// Imports to use the datetime library in the page.
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

// Import to use the select library in the page.
//import Select from 'react-select'
// Import to use my own dropdown in the page.
import Dropdown from '../components/Dropdown'

// Imports to use my own modal library in the page.
import { Modale } from 'react-modale-jf'
import 'react-modale-jf/dist/index.css'

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
const LabelName = styled.div`
    margin-bottom: -15px;
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
    margin: 20px;
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

    // To update the state of the first <Select/> component from the "react-select" library.
    //const [stateSelectedOption, setStateSelectedOption] = useState(null)
    // To update the state of the first <Dropdown/> component.
    const [stateChoice, setStateChoice] = useState("Choose...")

    const [zipCodeInputValue, setZipCodeInputValue] = useState("")

    // To update the state of the second <Select/> component from the "react-select" library.
    //const [deptSelectedOption, setDeptSelectedOption] = useState(null)
    // To update the state of the second <Dropdown/> component.
    const [deptChoice, setDeptChoice] = useState("Choose...")

    // The different "useState" above allow to keep the data of the different fields in the form.

    const [open, setOpen] = useState(false)
    // This last one is used by the modal at the end of the page.

    // This context uses the "FakeData" array.
    const context = useContext(EmployeeContext)

    function getStateChoice(e) {
        const chosenLabel = e.target.innerText
        setStateChoice(chosenLabel)
    }

    function getDeptChoice(e) {
        const chosenLabel = e.target.innerText
        setDeptChoice(chosenLabel)
    }

    // This function displays an error message with "alert()" when a value in a field is invalid
    // or a success message in a modal window when everything is fine.
    // When successful, the new data is added temporarily (until the next session) to the data array.
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

        /*else if (stateSelectedOption === null) {*/
        else if (stateChoice === "Choose...") {
            alert("The state field is empty.")
        }

        // Conditions used : If the field is empty OR if the number is less than 5 digits long
        // OR if the number is more than 5 digits long.
        else if (zipCodeInputValue === "" || zipCodeInputValue < 10000 || zipCodeInputValue >= 100000) {
            alert("The zip code field is invalid.")
        }

        /*else if (deptSelectedOption === null) {*/
        else if (deptChoice === "Choose...") {
            alert("The department field is empty.")
        }

        else {
            // The conditions below check the numbers of the day and the month of the 2 date fields.
            // If the day's number is below 10 or if the month's number is below 9 (because of the index),
            // a "0" is added before the number.
            const zero = "0"
            let startDateDay
            let startDateMonth
            const startDateYear = startDateInputValue._d.getFullYear()
            let birthDateDay
            let birthDateMonth
            const birthDateYear = birthDateInputValue._d.getFullYear()

            if (startDateInputValue._d.getDate() < 10) {
                startDateDay = zero.concat(startDateInputValue._d.getDate())
            }
            else {startDateDay = startDateInputValue._d.getDate()}
            if (startDateInputValue._d.getMonth() < 9) {
                startDateMonth = zero.concat(startDateInputValue._d.getMonth() + 1)
            }
            else {startDateMonth = startDateInputValue._d.getMonth() + 1}
            if (birthDateInputValue._d.getDate() < 10) {
                birthDateDay = zero.concat(birthDateInputValue._d.getDate())
            }
            else {birthDateDay = birthDateInputValue._d.getDate()}
            if (birthDateInputValue._d.getMonth() < 9) {
                birthDateMonth = zero.concat(birthDateInputValue._d.getMonth() + 1)
            }
            else {birthDateMonth = birthDateInputValue._d.getMonth() + 1}

            const startDateFull = startDateDay + "/" + startDateMonth + "/" + startDateYear
            const birthDateFull = birthDateDay + "/" + birthDateMonth + "/" + birthDateYear

            // This function adds the new data at the beginning of the "FakeData" array.
            context.addEmployee({
                firstName: firstNameInputValue,
                lastName: lastNameInputValue,
                startDate: startDateFull,
                department: deptChoice,
                birthDate: birthDateFull,
                street: streetInputValue,
                city: cityInputValue,
                state: stateChoice,
                zipCode: zipCodeInputValue
            })

            // This function finally displays the modal when everything else is done.
            displayModale()
        }
    }

    // Customization of the input in the <Datetime/> component.
    let inputProps = {
        className: "dateLib"
    }

    // Data for the <Select/> components from the "react-select" library.
    /*
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
    */

    // Styles for the <Select/> components from the "react-select" library.
    /*
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
    */

    // Data for the <Dropdown/> components.
    const stateChoices = [
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
    const deptChoices = [
        {value: "sales", label: "Sales"},
        {value: "marketing", label: "Marketing"},
        {value: "engineering", label: "Engineering"},
        {value: "human resources", label: "Human Resources"},
        {value: "legal", label: "Legal"}
    ]

    // The 2 functions below are used by the modal library I created.
    function displayModale() {
        setOpen(true)
    }
    function closeModale() {
        setOpen(false)
    }

    function stopPropag(e) {
        e.stopPropagation()
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
                    <Link to="/employeeList" onClick={stopPropag}>View Current Employees</Link>
                    <h2>Create Employee</h2>
                    <form action="#" id="create-employee">
                        <Label>
                            <LabelName>First Name</LabelName><br/>
                            <Input type="text" value={firstNameInputValue}
                            onChange={(e) => setFirstNameInputValue(e.target.value)} onClick={stopPropag}/>
                        </Label>
                        
                        <Label>
                            <LabelName>Last Name</LabelName><br/>
                            <Input type="text" value={lastNameInputValue}
                            onChange={(e) => setLastNameInputValue(e.target.value)} onClick={stopPropag}/>
                        </Label>

                        <Label>
                            <LabelName>Date of Birth</LabelName><br/>
                            <Datetime inputProps={inputProps} value={birthDateInputValue}
                            onChange={(value) => setBirthDateInputValue(value)}
                            timeFormat={false} dateFormat="DD/MM/YYYY"/>
                        </Label>
                        {/* "inputProps" allows to customize the appearance of the input,
                        "timeFormat" hides the time of the day in the picker and in the input and
                        "dateFormat" sets the order of the numbers in the date.*/}

                        <Label>
                            <LabelName>Start Date</LabelName><br/>
                            <Datetime inputProps={inputProps} value={startDateInputValue}
                            onChange={(value) => setStartDateInputValue(value)}
                            timeFormat={false} dateFormat="DD/MM/YYYY"/>
                        </Label>

                        <Fieldset className="address">
                            <legend>Address</legend>

                            <Label>
                                <LabelName>Street</LabelName><br/>
                                <Input type="text" value={streetInputValue}
                                onChange={(e) => setStreetInputValue(e.target.value)} onClick={stopPropag}/>
                            </Label>

                            <Label>
                                <LabelName>City</LabelName><br/>
                                <Input type="text" value={cityInputValue}
                                onChange={(e) => setCityInputValue(e.target.value)} onClick={stopPropag}/>
                            </Label>

                            <Label>
                                <LabelName>State</LabelName><br/>
                                {/* The component commented below is used by the "react-select" library. */}
                                {/*<Select options={stateOptions} defaultValue={stateSelectedOption}
                                onChange={setStateSelectedOption} menuPlacement="bottom" styles={customStyles}/>*/}
                                <Dropdown choices={stateChoices} onClick={getStateChoice} choice={stateChoice}/>
                            </Label>

                            <Label>
                                <LabelName>Zip Code</LabelName><br/>
                                <Input type="number" value={zipCodeInputValue}
                                onChange={(e) => setZipCodeInputValue(e.target.value)} onClick={stopPropag}/>
                            </Label>
                        </Fieldset>

                        <Label>
                            <LabelName>Department</LabelName><br/>
                            {/* The component commented below is used by the "react-select" library. */}
                            {/*<Select options={deptOptions} defaultValue={deptSelectedOption}
                            onChange={setDeptSelectedOption} menuPlacement="top" styles={customStyles}/>*/}
                            <Dropdown choices={deptChoices} onClick={getDeptChoice} choice={deptChoice}/>
                        </Label>
                    </form>

                    <Button onClick={saveEmployee}>Save</Button>
                </Container>
                <Modale message="Employee Created!" open={open} onClose={closeModale}/>
            </main>
        </HelmetProvider>
    )
}

export default CreateEmployee
