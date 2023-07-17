import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility } from './redux/todoSlice'

import AddProductForm from './Admin/ProductForm'

const Modal = ({ product, title }) => {

    const visibility = useSelector(state => state.productFormVisibility.visibility)
    const dispatch = useDispatch()

    
    const closeProductContainer = () => {
        dispatch(productFormVisibility({visibility:false}));
    }

    console.log('xxx',visibility, product)


    return (
        <div className={visibility ? "activeProductContainer" : "editProductContainer"}>
            <section className='closeProductContainer' onClick={closeProductContainer}>X</section>
            <AddProductForm productData={product} title={title} />
        </div>
    )
}

export default Modal