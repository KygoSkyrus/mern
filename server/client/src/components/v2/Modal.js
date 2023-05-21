import React from 'react'
import AddProductForm from './Admin/ProductForm'

const Modal = ({ product, displayProductForm, setDisplayProductForm, title }) => {

    const closeProductContainer = () => {
        setDisplayProductForm(false)
    }

    console.log('xxx', product, displayProductForm)


    return (
        <div className={displayProductForm ? "activeProductContainer" : "editProductContainer"}>
            <section className='closeProductContainer' onClick={closeProductContainer}>X</section>
            <AddProductForm productData={product} title={title} />
        </div>
    )
}

export default Modal