import React, { useState, useRef } from 'react'
import './dropdown.css'
import down from './Arrow-down.png'
import up from './Arrow-up.png'

const Dropdown = (props) => {
    // To update the state of the component : closed or opened ?
    const [open, setOpen] = useState(false)

    // Has a choice already been made in the component ?
    // To update the state of the previous choice : null (no previous choice made) or a previous option's div ?
    const [previousChoiceDiv, setPreviousChoiceDiv] = useState(null)

    // The hook "useRef()" is used to differentiate between the 2 instances
    // of the <Dropdown/> component present in "createEmployee.js".
    const chosen = useRef()
    const arrowDown = useRef()
    const arrowUp = useRef()
    const openMenu = useRef()
    const openedChoice = useRef()

    function openOrCloseMenu(e) {
        arrowDown.current.classList.toggle("hideArrowDown")
        arrowUp.current.classList.toggle("showArrowUp")
        openMenu.current.classList.toggle("showOpenedChoices")
        open === false ? (setOpen(true)) : (setOpen(false))
        e.stopPropagation()
    }

    function selectChoice(e) {
        const chosenDiv = e.target

        if (chosen.current.classList.contains("noChosen")) {
            chosen.current.classList.replace("noChosen", "chosen")
            chosenDiv.classList.toggle("openedActiveChoice")
        }
        else if (previousChoiceDiv !== chosenDiv) {
            previousChoiceDiv.classList.toggle("openedActiveChoice")
            chosenDiv.classList.toggle("openedActiveChoice")
        }
        setPreviousChoiceDiv(chosenDiv)
    }

    // The function below closes the dropdown if the user clicks outside of it.
    window.addEventListener("click", function(e) {
        const myTarget = e.target
        if (!myTarget.matches(".closedChoices") && !myTarget.matches(".noChosen") && !myTarget.matches(".chosen")
        && !myTarget.matches(".arrowImg") && !myTarget.matches(".openedChoice") && (open === true)) {
            arrowDown?.current?.classList?.remove("hideArrowDown")
            arrowUp?.current?.classList?.remove("showArrowUp")
            openMenu?.current?.classList?.remove("showOpenedChoices")
            setOpen(false)
        }
    })

    return (<div>
        <div className="choices" onClick={props.onClick}>
            <div className="closedChoices" onClick={openOrCloseMenu}>
                <div className="noChosen" ref={chosen} onClick={openOrCloseMenu}>
                    {props.choice}
                </div>
                <div className="arrows">
                    <span className="showArrowDown" ref={arrowDown}>
                        <img className="arrowImg" src={down} alt="" onClick={openOrCloseMenu}/>
                    </span>
                    <span className="hideArrowUp" ref={arrowUp}>
                        <img className="arrowImg" src={up} alt="" onClick={openOrCloseMenu}/>
                    </span>
                </div>
            </div>
            <div className="hideOpenedChoices" ref={openMenu}>
                {props.choices.map(({value, label}) => (
                    <div key={value} className="openedChoice" ref={openedChoice} onClick={selectChoice}>
                        {label}
                    </div>
                ))}
            </div>
        </div>
    </div>)
}

export default Dropdown