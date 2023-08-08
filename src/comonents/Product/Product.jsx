import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    // console.log(props);
    const {name,img,price,seller,stock,star} = props.product;

    return (
        <div className='product'>
            <div>
                 <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <p><small>By: {seller}</small></p>
                <p>Price: ${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <Rating 
                    initialRating={star}
                    emptySymbol= "fa fa-star-o icon-color"
                    fullSymbol= "fa fa-star icon-color"
                    readonly></Rating>
                <br />
                <button 
                onClick={()=>props.handleAddToCart(props.product)}
                className='btn-regular'><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;