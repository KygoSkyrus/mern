import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { productFormVisibility, setProductFormTitle } from './../redux/todoSlice'

import { clearProductForm } from './../redux/todoSlice'
import { Link } from 'react-router-dom'

const Nav = () => {
  const dispatch = useDispatch()

  const visibility = useSelector(state => state.productFormVisibility.visibility)


  useEffect(() => {
    // getSidebarWorking()
    handleSelectedOption()
  }, [])

  const handleAddClick = () => {
    if (!visibility) {
      dispatch(clearProductForm());
      dispatch(productFormVisibility({ visibility: !visibility }));
      dispatch(setProductFormTitle({ title: "Add product" }))
      console.log('ccc')
    }
  };


  //   function getSidebarWorking() {
  //      const btnToggler = document.querySelector(".btn-trapezoid-outline");
  //     // const navbar = document.querySelector(".sidebar");
  //     const menuItem = document.querySelectorAll(".menu-item");

  //     btnToggler.addEventListener('click', () => {
  //         navbar.classList.toggle('active');
  //         menuItem?.forEach(x => { x.classList.toggle('pl'); x.classList.toggle('w') })
  //     });
  // }

  function handleSelectedOption(e) {
    let currentOption;

    switch (window.location.href) {

      case window.location.origin + "/admin/dashboard": common("dashboard")
        break;

      case window.location.origin + "/admin/users": common("users")
        break;

      case window.location.origin + "/admin/orders": common("orders")
        break;

      default:
        break;
    }

    function common(data) {
      document.querySelector(`[data-link="${data}"]`)?.classList.add('active')
      currentOption = data
    }

    //removing selected class from other options
    document.querySelector('.btn-trapezoid-outline')?.childNodes.forEach(x => {
      if (x.classList.contains('active')) {
        if (x.dataset.link !== currentOption) {
          x.classList.remove('active')
        }
      }
    })
  }


  return (
    <>

      <div className='d-flex align-items-center admin-nav'>

        <div className="btn-trapezoid-outline" onClick={e => handleSelectedOption(e)} >
          <Link className='nav-icons text-white py-1 my-1' data-link="dashboard" to='/admin/dashboard'>
            <i className="fa-solid fa-shopping-bag" aria-hidden="true"></i>
          </Link>

          <Link className='nav-icons text-white py-1 my-1 active' data-link="orders" to='/admin/orders'>
            <i className="fa-solid fa-table" aria-hidden="true"></i>
          </Link>

          <Link className='nav-icons text-white py-1 my-1' data-link="users" to='/admin/users'>
            <i className="fa-regular fa-user" aria-hidden="true"></i>
          </Link>

          <section className='nav-icons py-1 my-1' onClick={handleAddClick}>
            <i className="fa-solid fa-add" aria-hidden="true"></i>
          </section>

        </div>
      </div>


    </>
  )
}

export default Nav