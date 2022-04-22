import React, { useState, useRef } from 'react'
import './dropdown.css'
import down from './Arrow-down.png'
import up from './Arrow-up.png'

const Dropdown = (props) => {
    //const [open, setOpen] = useState(false)
    const [choice, setChoice] = useState("Choose...")
    const [previousChoiceDiv, setPreviousChoiceDiv] = useState(null)

    // The hook "useRef()" is used to differentiate between the 2 instances of the <Dropdown/> component
    // present in "createEmployee.js".
    const choices = useRef()
    const chosen = useRef()
    const arrowDown = useRef()
    const arrowUp = useRef()
    const openMenu = useRef()
    const openedChoice = useRef()

    function openOrCloseMenu(e) {
        arrowDown.current.classList.toggle("hideArrowDown")
        arrowUp.current.classList.toggle("showArrowUp")
        openMenu.current.classList.toggle("showOpenedChoices")
        //e.stopPropagation()
    }

    function selectChoice(e) {
        const chosenDiv = e.target
        const chosenLabel = e.target.innerText

        if (chosen.current.classList.contains("noChosen")) {
            chosen.current.classList.replace("noChosen", "chosen")
            chosenDiv.classList.toggle("openedActiveChoice")
        }
        else if (previousChoiceDiv !== chosenDiv) {
            previousChoiceDiv.classList.toggle("openedActiveChoice")
            chosenDiv.classList.toggle("openedActiveChoice")
        }
        setChoice(chosenLabel)
        setPreviousChoiceDiv(chosenDiv)
    }

    // The function below SHOULD CLOSE the dropdown if the user clicks outside of it.
    // FUNCTION STILL TO IMPROVE !!
    window.addEventListener("click", function(event) {
    //function outsideClick (event) {
        const myTarget = event.target
        console.log(myTarget)
        //console.log(openMenu.current.classList)
        if (myTarget.matches(".noChosen") || myTarget.matches(".chosen")) {
            console.log("dans -chosen-")
        }
        else {
            console.log("pas dans -chosen-")
            if (openMenu.classList.contains("showOpenedChoices")) {
                console.log("flèche haut->bas")
                arrowDown.classList.replace("hideArrowDown", "showArrowDown")
                arrowUp.classList.replace("showArrowUp", "hideArrowUp")
                console.log("menu se ferme")
                openMenu.classList.replace("showOpenedChoices", "hideOpenedChoices")
            }
        }
        /*if (myTarget === choices) {console.log("oui")}
        else {console.log("non")}*/

        /*if (openMenu.classList.contains("showOpenedChoices")) {
            console.log("Menu ouvert.")*/
            //if (myTarget.matches(".choices")) {
                //console.log("Menu ouvert, clic dedans.")
                //if (openMenu.classList.contains("showOpenedChoices")) {
                    /*console.log("flèche haut->bas")
                    arrowDown.classList.replace("hideArrowDown", "showArrowDown")
                    arrowUp.classList.replace("showArrowUp", "hideArrowUp")
                    console.log("menu se ferme")
                    openMenu.classList.replace("showOpenedChoices", "hideOpenedChoices")*/
                //}
            /*}
            else {console.log("Menu ouvert, clic dehors.")}*/
        /*}
        else {console.log("Menu fermé.")}*/
    })
    //outsideClick()

    return (<div>
        <div className="choices" ref={choices}>
            <div className="closedChoices" onClick={openOrCloseMenu}>
                <div className="noChosen" ref={chosen}>{choice}</div>
                <div className="arrows">
                    <span className="showArrowDown" ref={arrowDown}><img className="arrowImg" src={down} alt=""/></span>
                    <span className="hideArrowUp" ref={arrowUp}><img className="arrowImg" src={up} alt=""/></span>
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
        <div style={{height: "250px"}}></div>
    </div>)
}

export default Dropdown