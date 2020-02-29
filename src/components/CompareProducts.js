import React from 'react'

export default function CompareProducts(props) {

    const { comparableProducts, factors, selectedFactors } = props;

    return (
        (selectedFactors.length>0 && comparableProducts.length>1 ) && <div>
            <table align="center">
                <tr align="center">
                    <th>Name</th>
                    {
                        factors.map((factor, index) => (
                            selectedFactors.includes(factor.label) &&
                            <th key={index} bgcolor={'#f9f9f9'}>{factor.label}</th>
                        ))
                    }   
                </tr>
                {
                    comparableProducts.map((product, index) => (
                        <tr key={index} align="center">
                            <td>{product.name}</td>
                            {
                                selectedFactors.includes('Price') && 
                                <td>{product.price}</td>
                            }
                            {
                                selectedFactors.includes('Color') && 
                                <td>
                                    {
                                        product.colors.map((color, index) => (
                                            <div key={index} className={`color-circle color-circle-background-${color}`}></div>
                                        ))
                                    }
                                </td>
                            }
                            {
                                selectedFactors.includes('Condition') && 
                                <td 
                                    bgcolor={
                                        product.condition==='Fresh' ? '#47cfad' :
                                        product.condition==='Frozen' ? '#ff705b' : 'white'
                                    }
                                >
                                    {product.condition}
                                </td>
                            }
                            {
                                selectedFactors.includes('Vendor') && 
                                <td>
                                    {
                                        product.vendors.map((vendor, index) => (
                                            <div key={index}>{vendor}</div>
                                        ))
                                    }
                                </td>
                            }
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}
