/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { debounce, signOut } from "./Utility";
import { setCatSubcatRelation } from "./redux/productSlice";
import theBagLogo from "./../../assets/images/thebaglogo.png";

const Navbar = () => {
  const [categories, setCategories] = useState();
  const [childWithoutParent, setChildWithoutParent] = useState([]);
  const [searchedItems, setSearchedItems] = useState()

  const dispatch = useDispatch()
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const cart = useSelector((state) => state.user.user.cart);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetch("/api/getcategory")
      .then((response) => response.json())
      .then((res) => {
        setCategories(res);
        let tempArray = [];
        res?.map((x) => {
          tempArray.push(x.name.toLowerCase());
        });

        let catSubcatRelation = {}
        res?.map((x) => {
          if (x.subCategory.length > 0) {
            x.subCategory.map((y, i) => {
              catSubcatRelation[y] = x.name;
              if (tempArray.includes(y.toLowerCase())) {
                tempArray.splice(tempArray.indexOf(y.toLowerCase()), 1); //removing subcat from main list
              }
            });
            tempArray.splice(tempArray.indexOf(x.name.toLowerCase()), 1); //finally removing the parent category after subcat is removed
          }
        });
        dispatch(setCatSubcatRelation({ val: catSubcatRelation }))//dispatching child parent relation to be used on product page and in navigation hierarchy
        setChildWithoutParent([...childWithoutParent, ...tempArray]);
      });
  }, []);


  let cartTotalQuantity = 0;
  cart?.map((x) => {
    cartTotalQuantity = cartTotalQuantity + x.quantity;
  });

  const Badge = () => {
    return (
      <section className="w3-badge w3-red w3-round">
        {cartTotalQuantity}
      </section>
    );
  };

  function handleNavBar(val) {
    const toggler = document.querySelector('.navbar-toggler')
    const isNavExpanded = toggler?.getAttribute('aria-expanded')
    const overlay = document.querySelector('.navbar-overlay')

    isNavExpanded === "true" ? overlay.classList.remove('display-none') : overlay.classList.add('display-none')
    if (val) toggler.click() //when overlay is clicked
  }

  const populateSubCategory = (e) => {
    let childCategoryElem = document.querySelector(".child-category");

    childCategoryElem.innerHTML = ""; //clearing the previous subCat
    childCategoryElem.classList.remove("display-none");

    let ul = e.target.childNodes[1]
    if (ul) ul.innerHTML = ""
    categories[e.target.dataset.index]?.subCategory?.map((x) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `/category/${x}`;
      a.innerHTML = x;
      a.classList.add("dropdown-item", "gap-2", "d-flex");
      li.appendChild(a);

      if (window.outerWidth < 992) {
        ul.appendChild(li)
      } else {
        childCategoryElem.appendChild(li);
      }
    });
  };

  const clearSubCategory = (e) => {
    let childCategoryElem = document.querySelector(".child-category");
    childCategoryElem.classList.add("display-none"); //and hiding it
  };

  function searchApi(cartItems) {
    if (cartItems.value !== " ") {
      return fetch("/api/searchprod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: cartItems.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchedItems(data)
          document.querySelector('.search-overlay').classList.remove('display-none')//puts the overlay
          document.querySelector('.custom-loader').classList.add('display-none')
          if (data.length === 0) {
            document.querySelector('.no-item')?.classList.remove('display-none')
          }
        })
        .catch((error) => {
          throw error; // Rethrow the error for error handling in the calling code
        });
    }
  }

  const debounceQuery = debounce(searchApi, 1500);

  const handleChange = (e) => {
    //fixing root height
    const root = document.getElementById('root')
    root.style.height = "100vh"
    root.style.overflow = "hidden"

    document.getElementById('searchdropdown').classList.remove('display-none')//mnake serch result visible
    document.querySelector('.search-overlay').classList.remove('display-none')//adding the overlay

    setSearchedItems(undefined)//setting the list to none so that it wont show previous result while typing
    document.querySelector('.custom-loader').classList.remove('display-none')//showing loader while typing
    document.querySelector('.no-item')?.classList.add('display-none')//hiding no item message while typing

    debounceQuery({ value: e.target.value });
  };

  function hideSearched(e) {
    document.querySelector('[type="search"]').value = "";//clearing the input on focus out
    document.getElementById('searchdropdown').classList.toggle('display-none')//hiding the dropdown
    document.querySelector('.search-overlay').classList.add('display-none')//removing the overlay
    const root = document.getElementById('root')
    root.style.height = "unset"
    root.style.overflow = "unset"
    setSearchedItems(undefined)

    handleNavBar(true)//to close navbar and hide overlay
  }

  return (
    <>
      {/* <div className='header-top'>
          header top
        </div> */}
      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm m-2"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "var(--shadow-small)",
          borderRadius: "6px",
          top: "0.5rem",
        }}
      >
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand">
            <div className="logo "></div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => handleNavBar()}
          >
            <div className="menu-toggle is-active" id="mobile-menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100 ">

              <li className="nav-item">
                <div className="position-relative px-2">
                  <input
                    type="search"
                    className="nav-link "
                    placeholder="search in shopp-itt"
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="search-dropdown display-none" id="searchdropdown">

                    {searchedItems?.map(x => {
                      return (
                        <section className="dropdown-item" key={x._id} onClick={() => hideSearched()}>
                          <Link to={`/product/${x._id}`}>
                            <img className="me-3" src={x.image} alt="shoppitt" height="50px" width="55px" />
                          </Link>
                          <Link to={`/product/${x._id}`}>
                            <span>{x.name}</span>
                          </Link>
                        </section>
                      )
                    })}

                    <div className="no-item display-none">No item found</div>
                    <div className="custom-loader display-none"></div>
                  </div>
                </div>
              </li>

              <li className="nav-item position-relative dropdown">
                <button
                  type="button"
                  className="nav-link dropdown-toggle"
                  id="dropdownCategory"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <div
                  className="shadow-s categoryListsHolder"
                  onMouseLeave={(e) => clearSubCategory(e)}
                >
                  <ul
                    className="dropdown-menu dropdownCategoryUL withoutParentUl"
                    aria-labelledby="dropdownCategory"
                  >
                    {categories?.map((x, i) => {
                      if (childWithoutParent.includes(x.name.toLowerCase())) {
                        return (
                          <li
                            key={i}
                            className="categoryWithoutParent"
                            onMouseOver={(e) => clearSubCategory(e)}
                          >
                            <a
                              className="dropdown-item gap-2 d-flex"
                              href={`/category/${x.name}`}
                              data-index={i}
                            >
                              {x.name}
                            </a>
                          </li>
                        );
                      }
                    })}
                  </ul>

                  <ul
                    className="dropdown-menu dropdownCategoryUL withParentUl"
                    aria-labelledby="dropdownCategory"
                  >
                    {categories ? (
                      categories?.map((x, i) => {
                        if (x.subCategory.length > 0) {
                          return (
                            <li
                              key={i}
                              className="parentCategoryList"
                              onMouseOver={(e) => populateSubCategory(e)}
                            >
                              <span className="grtrArrow"></span>
                              <section
                                className="dropdown-item dropdown gap-2 d-flex parentCat"
                                data-index={i}
                              >
                                {x.name}
                                <ul className="child-category-m dropdown-menu shadow d-none"></ul>
                              </section>
                            </li>
                          );
                        }
                      })
                    ) : (
                      <section className="text-center">...Loading</section>
                    )}
                    <ul className="child-category display-none dropdown-menu shadow-sm"></ul>
                  </ul>
                </div>
              </li>

              {!isUserLoggedIn && (
                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                    role="button"
                    data-bs-target="#exampleModalToggle"
                  >
                    SignIn
                  </a>
                </li>
              )}

              <li className="nav-item position-relative">
                <Link to="/cart" className="nav-link">
                  <img src={theBagLogo} alt="shoppitt" height="19.7px" />
                  {cartTotalQuantity !== 0 && <Badge />}
                </Link>
              </li>

              <li className="nav-item position-relative dropdown">
                {isUserLoggedIn && window.outerWidth > 992 ?
                  <img src={user.avtar} alt="" width="36px" id="profileDropdown"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false" className="dropdown-toggle ms-3 pointer shadow-sm rounded-circle" />
                  :
                  <button type="button" className="nav-link dropdown-toggle" id="profileDropdown" data-mdb-toggle="dropdown" aria-expanded="false">
                    Profile
                  </button>
                }
                <ul
                  className="dropdown-menu shadow-sm profileDropdownUL"
                  aria-labelledby="profileDropdown"
                >
                  <li className="">
                    <Link className="dropdown-item gap-2 d-flex align-items-center" to="/user">
                      {/* <i className="fa fa-user"></i> */}
                      Account
                    </Link>
                  </li>
                  <li className="">
                    <Link className="dropdown-item gap-2 d-flex align-items-center" to="/wishlist">
                      {/* <i className="fa fa-heart"></i> */}
                      Wishlist
                    </Link>
                  </li>
                  <li className="">
                    <Link className="dropdown-item gap-2 d-flex align-items-center" to="/orders">
                      {/* <i className="fas fa-box-open"></i> */}
                      Orders
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/admin/dashboard" className="dropdown-item gap-2 d-flex align-items-center">
                      {/* <i className="fa fa-hat-cowboy"></i> */}
                      Admin
                    </Link>
                  </li>
                  <li className="">
                    <span className="dropdown-item gap-2 d-flex pointer  align-items-center" onClick={() => signOut(dispatch)}>
                      {/* <i className="fa fa-sign-out-alt"></i> */}
                      Sign out
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="search-overlay display-none" onClick={() => hideSearched()}></div>{/* when serchInput is opened */}
      <div className="navbar-overlay display-none" onClick={() => handleNavBar(true)}></div>{/* when Navbar is expanded */}
    </>
  );
};

export default Navbar;