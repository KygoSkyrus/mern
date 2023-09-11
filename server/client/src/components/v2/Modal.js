import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility } from './redux/todoSlice'

import ProductForm from './Admin/ProductForm'

const Modal = () => {

    const visibility = useSelector(state => state.productFormVisibility.visibility)
    const dispatch = useDispatch()

    const closeProductContainer = (e) => {
        if (e.target !== document.querySelector('.productForm')) {
            dispatch(productFormVisibility({ visibility: false }));
        }
    }

    return (
        <>
            <div className={visibility ? "activeProductContainer" : "editProductContainer"} onClick={e => closeProductContainer(e)}></div>
            <ProductForm />
        </>
    )
}

export default Modal