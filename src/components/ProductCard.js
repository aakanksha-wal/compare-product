import React, { useState } from 'react'

const images = {
    Cherry: require('../images/Cherry.png'),
    Orange: require('../images/Orange.png'),
    Nuts: require('../images/Nuts.png'),
    Strawberry: require('../images/Strawberry.png'),
}

export default function ProductCard(props) {

    const { productDetails, comparableProducts, setComparableProducts } = props;
    const { image, name, description, price } = productDetails;
    const [isCompareEnabled, setIsCompareEnable] = useState(false);

    const handleCompareOrRemoveProduct = (productDetails) => {
        if(!isCompareEnabled){
            // current status - COMPARE
            const updatedComparableProducts = [
                ...comparableProducts,
                productDetails
            ]
            setComparableProducts(updatedComparableProducts);
        }
        else{ 
            // current status - REMOVE
            let productToBeRemovedIndex;
            comparableProducts.forEach((product, index)=>{
                if(product.id === productDetails.id){
                    productToBeRemovedIndex = index;
                }
            })
            comparableProducts.splice(productToBeRemovedIndex, 1);
            const updatedComparableProducts = [
                ...comparableProducts,
            ]
            setComparableProducts(updatedComparableProducts);
        }
        setIsCompareEnable(!isCompareEnabled)
    }
    
    return (
        <>
        <div className="card-layout">
            <div className="product-img-container">
                <img
                    className={!isCompareEnabled ? "product-img" : "product-img-selected"}
                    src={images[image].default}
                    alt={name}
                />
                <div className="compare-button">
                    <div
                        className="text"
                        onClick={()=>handleCompareOrRemoveProduct(productDetails)}
                    >
                        {!isCompareEnabled ? 'COMPARE' : 'REMOVE'}
                    </div>
                </div>
            </div>
            <div className="product-brief" align="left">
                <div>
                    <strong>{name}</strong>
                </div>
                <div>
                    <span>{description}</span>
                </div>
            </div>
            <div className="product-price">
                <span>{price}</span>
            </div>
        </div>
        
        </>
    )
}
