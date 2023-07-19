import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility } from './redux/todoSlice'

import ProductForm from './Admin/ProductForm'

const Modal = ({ product, title }) => {

    const visibility = useSelector(state => state.productFormVisibility.visibility)
    const dispatch = useDispatch()

    
  
    console.log('xxx',visibility, product)
    const closeProductContainer = (e) => {
        console.log('dd1222',e.target,document.querySelector('.productForm'))
        if(e.target!==document.querySelector('.productForm'))
        dispatch(productFormVisibility({visibility:false}));
    }

    return (<>
        <div className={visibility ? "activeProductContainer" : "editProductContainer"} onClick={e=>closeProductContainer(e)}>
        </div>
            {/* <section className='closeProductContainer'>X</section> */}
            <ProductForm productData={product} title={title} />
            </>
    )
}

export default Modal