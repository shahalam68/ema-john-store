import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([])

    useEffect(()=>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        });
    },[]);
    useEffect( () => {
        if(products.length){
            const savedCart = getStoredCart();
            const stroedCart = [];
            for(const key in savedCart){
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                stroedCart.push(addedProduct);
                }
            }
            setCart(stroedCart);
        }
    },[products]);

    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart)
        // save to local storage
        addToDb(product.key)
    }

    const handleSearch = event =>{
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
        console.log(matchedProduct.length);
    }
    return (
        
        <>
            <div className='search-container'>
                <input 
                onChange={handleSearch}
                type="text" 
                placeholder=' Search product' />
            </div>
            <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product 
                        product={product}
                        key={product.key}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                
            </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;