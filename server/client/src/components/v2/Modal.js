import React from 'react'
import AddProductForm from './Admin/AddProductForm'

const Modal = ({ product, displayProductForm, setDisplayProductForm }) => {

    const closeProductContainer = () => {
        setDisplayProductForm(false)
    }

    console.log('xxx', product, displayProductForm)


    return (
        <div className={displayProductForm ? "activeProductContainer" : "editProductContainer"}>
            <section className='closeProductContainer' onClick={closeProductContainer}>X</section>
            <AddProductForm productData={product} />
        </div>
    )
}

export default Modal