import { useState } from 'react'
import './dropdown.css'

const deptChoices = [
    {value: "sales", label: "Sales"},
    {value: "marketing", label: "Marketing"},
    {value: "engineering", label: "Engineering"},
    {value: "human resources", label: "Human Resources"},
    {value: "legal", label: "Legal"}
]

const Dropdown = () => {
    //const [open, setOpen] = useState(false)
    const [choice, setChoice] = useState("Choose...")

    function openOrCloseMenu() {
        const openMenu = document.getElementById("openMenu")
        if (openMenu.classList.contains("hideOpenedChoices")) {
            openMenu.classList.remove("hideOpenedChoices")
            openMenu.classList.add("showOpenedChoices")
        }
        else {
            openMenu.classList.remove("showOpenedChoices")
            openMenu.classList.add("hideOpenedChoices")
        }
    }

    function selectChoice(e) {
        const choiceLabel = e.target.innerText
        console.log(choiceLabel)
        //console.log("deptChoices.label : " + deptChoices.label)
        //console.log("label : " + {label})
        setChoice(choiceLabel)
    }

    // The function below closes the dropdown if the user clicks outside of it.
    window.onclick = function(event) {
        if (!event.target.matches(".closedChoices")) {
            const openMenu = document.getElementById("openMenu")
            if (openMenu.classList.contains("showOpenedChoices")) {
                openMenu.classList.remove("showOpenedChoices")
                openMenu.classList.add("hideOpenedChoices")
            }
        }
    }

    return (<div>
        <div className="choices">
            <div id="closeMenu" className="closedChoices" onClick={openOrCloseMenu}>
                {choice}
            </div>
            <div id="openMenu" className="hideOpenedChoices">
                {deptChoices.map(({value, label}) => (
                    <div key={value} className="openedChoice" onClick={selectChoice}>
                        {label}
                    </div>
                ))}
            </div>
        </div>
        <div style={{height: "250px"}}></div>
    </div>)
}

export default Dropdown