import React, { useState } from 'react'
import './style.scss';
import { Button } from 'reactstrap';
import { data } from '../constants/data';
import { factorsArray } from '../constants/filters'
import ProductCard from './ProductCard';
import CompareProducts from './CompareProducts';
import FilterModal from './FilterModal';

export default function App() {

    const [comparableProducts, setComparableProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [factors, setFactors] = useState(factorsArray);
    const [selectedFactors, setSelectedFactors] = useState(
        factors.map(factor => factor.label)
    );

    const toggle = () => setModalIsOpen(!modalIsOpen);

    return (
        <div>
            <div className="header" align="center">
                <h4 className="title">Compare Products</h4>
                <Button
                    color="primary"
                    onClick={toggle}
                >
                    Add/Remove Attributes
                </Button>
            </div>
            <div align="center">
                <div className="products" >
                    {
                        data.map((product, index) => (
                            <li key={index}>
                                <ProductCard
                                    productDetails={product}
                                    comparableProducts={comparableProducts}
                                    setComparableProducts={setComparableProducts}
                                />
                            </li>
                        ))
                    }
                </div>
                {
                    comparableProducts.length>1 && 
                    <CompareProducts
                        comparableProducts={comparableProducts}
                        selectedFactors={selectedFactors}
                        factors={factors}
                        selectedFactors={selectedFactors}
                    />
                }
                <FilterModal
                    isOpen={modalIsOpen}
                    toggle={toggle}
                    factors={factors}
                    setFactors={setFactors}
                    selectedFactors={selectedFactors}
                    setSelectedFactors={setSelectedFactors}
                />
            </div>
        </div>
    )
}
