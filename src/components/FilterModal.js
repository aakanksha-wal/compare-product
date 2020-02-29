import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label } from 'reactstrap';
import SearchAttributes from './SearchAttributes';

export default function FilterModal(props) {
    const { isOpen, toggle, factors, setFactors, setSelectedFactors } = props;
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        let selectedFilterCount = 0;
        factors.forEach((factor) => {
            if(factor.isChecked){
                selectedFilterCount++;
            }
        })
        if(selectedFilterCount === factors.length){
            setSelectAll(true);
        }
    }, [factors])

    const handleSelectAll = (e) => {
        // Set check/uncheck of SELECT ALL
        setSelectAll(!selectAll);
        
        // Set independent factors as true or false as per check/uncheck of SELECT ALL
        let updateFactors = factors;
        if(e.target.checked){
            updateFactors.forEach(factor => {
                factor.isChecked = true
            })
        }
        else{
            updateFactors.forEach(factor => {
                factor.isChecked = false
            })
            
        }
        setFactors([...updateFactors]);
    }

    const handleFactorSelection = (e, factorValue) => {
        let updateFactors = factors;

        // Set check/uncheck of independent factors
        updateFactors.forEach((factor) => {
            if(factor.value === factorValue){
                factor.isChecked = e.target.checked;
            }
        })
        setFactors([...updateFactors]);

        // Set SELECT ALL as true or false as per check/uncheck of independent factors
        let selectedFilterCount = 0;
        factors.forEach((factor) => {
            if(factor.isChecked){
                selectedFilterCount++;
            }
        })
        if(selectedFilterCount === factors.length){
            setSelectAll(true);
        }
        else{
            setSelectAll(false);
        }
        
    }
    
    const handleFilter = () => {
        toggle();
        let updatedSelectedFactors = []
        let selectedFilterCount = 0;
        factors.forEach((factor)=>{
            if(factor.isChecked){
                selectedFilterCount++;
                updatedSelectedFactors = [
                    ...updatedSelectedFactors,
                    factor.label
                ]
            }
        })
        if(selectedFilterCount === 0){
            // Even if someone unchecks SELECT ALL, comparison should stays for all factors
            let allFilters = factors.map( factor => factor.label )
            setSelectedFactors([...allFilters])
        }
        else{
            // One or more than one filter selected ? then only those filter attributes will appear
            setSelectedFactors([...updatedSelectedFactors])
        }
    }
    
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add/Remove Attributes</ModalHeader>
                <ModalBody>
                    <Form>
                        <SearchAttributes
                            factors={factors}
                            setFactors={setFactors}
                        />
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />{' '}
                                <strong>Select All</strong>
                            </Label>
                        </FormGroup>
                        <hr />
                        {
                            factors.map((factor, index) => (
                                <FormGroup
                                    check
                                    key={index}
                                >
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            checked={factor.isChecked}
                                            onChange={(e) => handleFactorSelection(e, factor.value)}
                                        />
                                        {factor.label}
                                    </Label>
                                </FormGroup>
                            ))
                        }
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={handleFilter}>Apply</Button>
                </ModalFooter>
            </Modal>
        </div>
      );
}
