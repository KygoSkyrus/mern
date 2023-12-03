import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setProductFormVisibility, setProductFormTitle } from '../redux/productFormSlice'
import { clearProductForm } from '../redux/productFormSlice'

const Nav = () => {

  const adminNavRef = useRef();
  const dispatch = useDispatch();

  const productFormVisibility = useSelector(state => state.productForm.visibility)
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)

  useEffect(() => {
    // getSidebarWorking()
    handleSelectedOption()
  }, [])

  const handleAddClick = () => {
    if (!productFormVisibility) {
      dispatch(clearProductForm());
      dispatch(setProductFormVisibility({ visibility: !productFormVisibility }));
      dispatch(setProductFormTitle({ title: "Add product" }))
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


  const hideShowSidebar = (e) => {
    console.log('jfjdf', document.querySelector('.admin-table-grid'))
    if (e.currentTarget.dataset.ishidden === "true") {
      adminNavRef.current.classList.remove('hideSidebar');//hiding side navbar
      e.currentTarget.childNodes.forEach(x => {
        x.style.borderRadius = "2px"
        x.style.transform = x.classList.contains("upper") ? "rotate(18deg) translateY(1.5px)" : "rotate(-18deg) translateY(-1.5px)"
      })//inverting arrow
      document.querySelector('.admin-table-grid')?.classList.add('slide-admin-table')//sliding table with sidebar
      setIsSidebarHidden(false)
    } else {
      adminNavRef.current.classList.add('hideSidebar');
      e.currentTarget.childNodes.forEach(x => {
        // x.style.transform = "unset"
        x.style.transform = x.classList.contains("upper") ? "rotate(-18deg) translateY(1.5px)" : "rotate(18deg) translateY(-1.5px)"
      })
      document.querySelectorAll('.admin-table-grid').forEach(x => {
        x.classList.remove('slide-admin-table')
      })
      setIsSidebarHidden(true)
    }
  }

  return (
    <>

      <div className='d-flex align-items-center admin-nav hideSidebar' ref={adminNavRef}>

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
        <div className='arrow pointer' data-ishidden={isSidebarHidden} onClick={(e) => hideShowSidebar(e)}>
          <div className='upper'></div>
          <div className='lower'></div>
        </div>
      </div>


    </>
  )
}

export default Nav