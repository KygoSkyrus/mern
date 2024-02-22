import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ProductForm from './ProductForm'
import { setProductFormVisibility } from '../redux/productFormSlice'

const Modal = () => {

    const dispatch = useDispatch()
    const productFormVisibility = useSelector(state => state.productForm.visibility)

    const closeProductFormContainer = (e) => {
        if (e.target !== document.querySelector('.productForm')) {
            dispatch(setProductFormVisibility({ visibility: false }));
        }
    }

    return (
        <>
            <div className={productFormVisibility ? "activeProductContainer" : "editProductContainer"} onClick={e => closeProductFormContainer(e)}></div>
            <ProductForm />
        </>
    )
}

export default Modal