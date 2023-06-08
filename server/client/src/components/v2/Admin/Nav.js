import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {productFormVisibility} from './../redux/todoSlice'

import {clearProductForm} from './../redux/todoSlice'

const Nav = () => {
  const dispatch = useDispatch()

  const visibility = useSelector(state => state.productFormVisibility.visibility)
  
    
  const handleAddClick = () => {
    // dispatch(productFormVisibility({visibility:!visibility}));
    dispatch(clearProductForm());
console.log('ccc')
  };
 
  

  return (
    <>

    <div className='d-flex align-items-center'>

  <div className="btn-trapezoid-outline" >
    <section className='nav-icons'>

  <i class="fa-solid fa-shopping-bag" aria-hidden="true"></i>
  
    </section>
    <p>{visibility}</p>
<section className='nav-icons'  onClick={handleAddClick}>
  <i class="fa-solid fa-add" aria-hidden="true"></i>
</section>

  </div>
    </div>


    </>
  )
}

export default Nav