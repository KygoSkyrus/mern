import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Navbar = (props) => {

  const [categories, setCategories] = useState()
  const [categoriesAndID, setCategoriesAndID] = useState({})
  const Badge = () => {
    if (props.data > 0) {
      return (
        <span className="w3-badge w3-red w3-round">{props.data}</span>
      )
    } else {
      return null
    }
  }

  useEffect(() => {
    fetch("/api/getcategory")
      .then(response => response.json())
      .then(res => {
        console.log('res', res)
        setCategories(res)
        let tempObject = {}
        res.map(x => {
          tempObject[x.name.toLowerCase()] = x._id//bcz some of categories are capitalized
        })
        setCategoriesAndID({ ...categoriesAndID, ...tempObject })
      })
  }, [])

  //can put this in usememo
  const populateSubCategory = (e) => {
    // console.log('populateSubCategory', categoriesAndID)

    let childCategoryElem = document.querySelector('.child-category')
   
    childCategoryElem.innerHTML = ''//clearing the previous subCat
    // if(childCategoryElem.innerHTML===""){
    //   console.log('is empty')
    //   childCategoryElem.classList.add('display-none')
    //   }
    categories[e.target.dataset.index].subCategory.map(x => {
      let li = document.createElement('li')
      let a = document.createElement('a')
      a.href = `/category/${categoriesAndID[x.toLowerCase()]}`//change this later
      a.innerHTML = x
      a.classList.add('dropdown-item', 'gap-2', 'd-flex')
      li.appendChild(a)
      childCategoryElem.appendChild(li)
        // childCategoryElem.classList.remove('display-none')
    })
  }

  // const clearSubCategory=(e)=>{
  //   console.log('jkajdjs')
  //   let childCategoryElem = document.querySelector('.child-category')
  //   childCategoryElem.innerHTML = ''//clearing the previous subCat
  // }

  return (
    <>
      {/* <div className='header-top'>
          header top
        </div> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm" >

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

              <li className="nav-item position-relative dropdown"  
              // onMouseOut={e=>clearSubCategory(e)}
              >

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
                <ul className="dropdown-menu shadow dropdownCategoryUL" aria-labelledby="dropdownCategory">
                  {
                  categories? 
                  categories?.map((x, i) => {
                    if (x.subCategory.length > 0) {
                      return (
                        <li onMouseOver={e => populateSubCategory(e)}>
                          <a className="dropdown-item gap-2 d-flex" href="/#" data-index={i} >
                            {x.name}
                          </a>
                        </li>
                      )
                    }
                  })
                :
                <section className='text-center'>...Loading</section>}
                  <ul className='child-category display-none dropdown-menu shadow'></ul>
                </ul>

              </li>

              <li className="nav-item">
                <a className="nav-link " data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                  SignIn
                </a>
              </li>

              <li className="nav-item position-relative">
                <Link to="/cart" className="nav-link">
                  <i className='fa fa-shopping-cart'></i>
                  <span>Cart</span>
                  <Badge />
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/admin/dashboard" className="nav-link">
                  Admin
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link to="/admin/profile" className="nav-link">
                  <span>Profile</span>
                  <i className='fa fa-user'></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar