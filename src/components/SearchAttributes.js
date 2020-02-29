import React, { useState } from 'react'
import { Form, Input, FormGroup } from 'reactstrap';

export default function SearchAttributes(props) {

    const { factors, setFactors } = props
    const attributes = factors.map(factor => factor.label).sort();

    const [filteredAttributes, setFilteredAttributes] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [isSuggestionEnabled, setIsSuggestionEnabled] = useState(false);
    const [userInput, setUserInput] = useState("");

    const onChange = (e) => {
        const currentInput = e.target.value;
    
        const filteredSuggestions = attributes.filter(
            attribute => attribute.toLowerCase().includes(currentInput.toLowerCase()) 
        );
    
        setActiveSuggestionIndex(0);
        setFilteredAttributes(filteredSuggestions)
        setIsSuggestionEnabled(true)
        setUserInput(currentInput)
    };

    const onKeyDown = (e) => {

        // Handle down arrow key
        if (e.keyCode === 40) {
            if (activeSuggestionIndex + 1 === filteredAttributes.length) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }

        // Handle up arrow key
        else if (e.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }

        // Enter Key
        if (e.keyCode === 13) {
            e.preventDefault() 
            setActiveSuggestionIndex(0);
            setIsSuggestionEnabled(false)
            setUserInput(filteredAttributes[activeSuggestionIndex])

            // Check selected attribute from serach input
            let updatedFactors = factors;
            updatedFactors.forEach((factor) => {
                if(factor.label === userInput){
                    factor.isChecked=true;
                }
            })
            setFactors([...updatedFactors])
        }
    };

    const onClick = (e) => {
        setActiveSuggestionIndex(0);
        setIsSuggestionEnabled(false)
        setUserInput(e.target.innerText);
        setFilteredAttributes([]);
    };
    
    let SuggestionsList;
    if(userInput && isSuggestionEnabled){
        if(filteredAttributes.length){
            SuggestionsList = (
                <ul className="suggestions">
                    {
                        filteredAttributes.map((suggestion, index) => (
                            <li
                                key={suggestion}
                                className={index === activeSuggestionIndex ? 'suggestion-active' : ''}
                                onClick={onClick}
                            >
                            {suggestion}
                            </li>
                        ))
                    }
                </ul>
            )
        }
        else{
            SuggestionsList = '';
        }
    }

    return (
        <div>
            <Form>
                <FormGroup>
                    <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search Attributes"
                        value={userInput}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                </FormGroup>
            </Form>
            {SuggestionsList}
        </div>
    )
}
