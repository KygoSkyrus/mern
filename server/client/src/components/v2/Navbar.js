import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import theBagLogo from "./../../assets/images/thebaglogo.png"

const Navbar = () => {

  const [categories, setCategories] = useState()
  const [childWithoutParent, setChildWithoutParent] = useState([])

  const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const cart = useSelector(state => state.user.user.cart)

  let cartTotalQuantity = 0;
  cart.map(x => {
    cartTotalQuantity = cartTotalQuantity + x.quantity;
  })

  const Badge = () => {
    return <section className="w3-badge w3-red w3-round">{cartTotalQuantity}</section>
  }

  //NOTE::: cannot have two columns for categories as on over on lement ffrom 1st col ypu wont be able to react the subcategory,,either put all of your subcate at theright side or separate the prent cat and cate without parent

  useEffect(() => {
    fetch("/api/getcategory")
      .then(response => response.json())
      .then(res => {
        console.log('res', res)
        setCategories(res)
        // let tempObject = {}
        let tempArray = []
        res.map(x => {
          // tempObject[x.name.toLowerCase()] = x._id//bcz some of categories are capitalized
          tempArray.push(x.name.toLowerCase())
        })

        //total - 59
        //with parent - 34
        //without parent - 11
        // parent category - 14
        //this can be moved to down in jsx
        res.map(x => {
          if (x.subCategory.length > 0) {
            x.subCategory.map((y, i) => {
              if (tempArray.includes(y.toLowerCase())) {
                tempArray.splice(tempArray.indexOf(y.toLowerCase()), 1)//removing subcat
              }
            })
            tempArray.splice(tempArray.indexOf(x.name.toLowerCase()), 1)//finally removing the parent category after subcat is removed
          }
        })
        console.log('s', tempArray)
        // setCategoriesAndID({ ...categoriesAndID, ...tempObject })//it has all categories and their id in an object, if to remove alos reove tempobj
        setChildWithoutParent([...childWithoutParent, ...tempArray])
      })

  }, [])

  //can put this in usememo
  const populateSubCategory = (e) => {
    console.log('populateSubCategory', e.target, e.target.dataset.index)

    let childCategoryElem = document.querySelector('.child-category')

    childCategoryElem.innerHTML = ''//clearing the previous subCat
    childCategoryElem.classList.remove('display-none')


    categories[e.target.dataset.index]?.subCategory?.map(x => {
      let li = document.createElement('li')
      let a = document.createElement('a')
      console.log('fff', x.toLowerCase())
      a.href = `/category/${x}`
      a.innerHTML = x
      a.classList.add('dropdown-item', 'gap-2', 'd-flex')
      li.appendChild(a)
      childCategoryElem.appendChild(li)
    })
  }

  const clearSubCategory = (e) => {
    let childCategoryElem = document.querySelector('.child-category')
    childCategoryElem.classList.add('display-none')//and hiding it
  }


  return (
    <>
      {/* <div className='header-top'>
          header top
        </div> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm m-2" style={{ boxShadow: "var(--shadow-small)", borderRadius: "6px", top: "0.5rem" }} >

        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand" >
            <div className="logo ">
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100 ">

              <li className="nav-item">
                <input type='search' className="nav-link " placeholder='search in shopp-itt' />
              </li>

              <li className="nav-item position-relative dropdown" >

                <button type="button"
                  // className="nav-link" id="dropdownCategory" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"
                  class="nav-link dropdown-toggle"
                  id="dropdownCategory"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                {/* here put the categoires dynamicaaly and on hover of these categpries there will be the subcategpry will be shown only if the subcategory is avaible and put the subcategory there on hover,,,have to create the subcategory dropdown manuallty though */}
                <div className='shadow' style={{ position: "absolute", right: 0, display: "flex" }} onMouseLeave={e=>clearSubCategory(e)}>
                  <ul className="dropdown-menu dropdownCategoryUL withoutParentUl" aria-labelledby="dropdownCategory">                  
                    {categories?.map((x, i) => {
                      if (childWithoutParent.includes(x.name.toLowerCase())) {
                        return (
                          <li key={i} className='categoryWithoutParent' onMouseOver={e => clearSubCategory(e)}>
                            <a className="dropdown-item gap-2 d-flex" href={`/category/${x.name}`} data-index={i} >
                              {x.name}
                            </a>
                          </li>
                        )
                      }
                    })}
                  </ul>

                  <ul className="dropdown-menu dropdownCategoryUL withParentUl" aria-labelledby="dropdownCategory">
                    {
                      categories ?
                        categories?.map((x, i) => {
                          if (x.subCategory.length > 0) {
                            return (
                              <li key={i} className='parentCategoryList' onMouseOver={e => populateSubCategory(e)} 
                              //onMouseOut={e => clearSubCategory(e)}
                              >
                                <span></span>
                                <a className="dropdown-item gap-2 d-flex" href="/#" data-index={i} >
                                  {x.name}
                                </a>
                              </li>
                            )
                          }
                        })
                        :
                        <section className='text-center'>...Loading</section>
                    }
                    <ul className='child-category display-none dropdown-menu shadow'></ul>
                  </ul>
                </div>
              </li>
              {!isUserLoggedIn &&
                <li className="nav-item">
                  <a className="nav-link " data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                    SignIn
                  </a>
                </li>
              }

              <li className="nav-item position-relative">
                <Link to="/cart" className="nav-link">
                  {/* <i className='fa fa-shopping-cart'></i> */}
                  {/* if the cart value is zero than dont show badge */}
                  <img src={theBagLogo} alt='' height='19.7px' />
                  {/* <span>Cart</span> */}
                  {cartTotalQuantity !== 0 &&
                    <Badge />}
                </Link>
              </li>
              {/* <li className="nav-item ">
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </li> */}
              <li className="nav-item ">
                <Link to="/admin/dashboard" className="nav-link">
                  Admin
                </Link>
              </li>
              <li className="nav-item position-relative dropdown">
                <button type="button"
                  // className="nav-link" id="dropdownCategory" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"
                  class="nav-link dropdown-toggle"
                  id="profileDropdown"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </button>
                <ul className="dropdown-menu shadow profileDropdownUL" aria-labelledby="profileDropdown">
                  <li className='' >
                    <Link className="dropdown-item gap-2 d-flex" to="/user" >Account</Link>
                  </li>
                  <li className='' >
                    <Link className="dropdown-item gap-2 d-flex" to="/wishlist" >Wishlist</Link>
                  </li>
                  <li className='' >
                    <Link className="dropdown-item gap-2 d-flex" to="/orders" >Orders</Link>
                  </li>
                </ul>
                {/* <Link to="/user" className="nav-link">
                  <span>Profile</span>
                  <i className='fa fa-user'></i>
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar