import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility, setProductFormTitle, setProductForm } from './../redux/todoSlice'




import Modal from './../Modal'
import Product from './Product'

const Dashboard = () => {

    const [products, setProducts] = useState() //to set products fetched from server

    const visibility = useSelector(state => state.productFormVisibility.visibility)// modal's visibility 


    useEffect(() => {
        console.log('ue in hp')
        fetch('/api/getproducts', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                console.log('products', data)
                setProducts(data)
            })
    }, [])



    //delete this,,net issue
    
    const dispatch = useDispatch()
    const productState={
        name: "xx", url: "xx", price: 2, description: "x", category: "first", image: ["https:/?njdsj"], stock: 0
    }
    const handleCardClick = (product) => {
        dispatch(setProductForm(product)) //setting the product form with currently selected product for editing
        dispatch(productFormVisibility({ visibility: !visibility })); //setting modal's visibility
        dispatch(setProductFormTitle({ title: "Edit product" })) // setting modal's title
    };


    return (
        <>
            <div id="x"></div>
            <div >


                {/* THE HEADER */}
                <div className="p-3 overflow-auto d-flex  bg-white-custom border-bottom shadow-sm ">

                    {/* <!-- Left Side--> */}
                    <div className="d-flex flex-grow-1">


                        <h6 className="align-self-center mb-0 me-3 fw-semibold text-nowrap">
                            Projects
                        </h6>


                        {/* <!-- START Dropdown: Bulk Options--> */}
                        <div className="dropdown">
                            <button className="btn btn-sm btn-link text-decoration-none text-muted dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-cog"></i>
                            </button>
                            <ul className="dropdown-menu shadow rounded-4" aria-labelledby="dropdownMenuButton1">
                                <li><h6 className="dropdown-header fw-normal">Bulk Options</h6></li>
                                <li>
                                    <a className="dropdown-item gap-2 d-flex" href="#">
                                        <i className="fa fa-star fa-fw me-2 me-2 text-muted opacity-50 align-self-center"></i>
                                        Add to Favorites
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item gap-2 d-flex" href="#">
                                        <i className="fa fa-align-right fa-fw text-muted me-2 opacity-50 align-self-center"></i>
                                        Select Priority
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item gap-2 d-flex" href="#">
                                        <i className="fa fa-signal fa-fw  me-2 text-muted opacity-50 align-self-center"></i>
                                        Select Status
                                    </a>
                                </li>
                                <li>
                                    <button className="dropdown-item gap-2 d-flex" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectUsers">
                                        <i className="fa fa-user fa-fw me-2 text-muted opacity-50 align-self-center"></i>
                                        Assign Users
                                    </button>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item gap-2 d-flex" href="#">
                                        <i className="fa fa-trash fa-fw text-muted me-2 opacity-50 align-self-center"></i>
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- END Dropdown: Bulk Options--> */}

                    </div>

                    {/* <!-- Right Side--> */}
                    <div className="d-flex h-stack gap-1 position-relative">

                        {/* Dark Mode */}
                        <div className='btn'>
                        <input class="checkbox" type="checkbox" id="toggle" onChange={() => {
                            document.querySelector('.adminView').classList.toggle('dark');
                            document.querySelectorAll('.bg-white-custom').forEach(x=>{x.classList.toggle('dark')})
                        }} />
                        <label class="toggle" for="toggle">
                            <ion-icon class="icon icon--light" name="sunny-outline"></ion-icon>
                            <ion-icon class="icon icon--dark" name="moon-outline"></ion-icon>
                            <span class="ball"></span>
                        </label>
                        </div>
                        {/* <!-- List View --> */}
                        <a href="/projects-list.html" className="btn btn-link btn-sm rounded-circle text-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="List View">
                            <i className="fas fa-columns"></i>
                        </a>

                        {/* <!-- Grid View --> */}
                        <a href="/projects-grid.html" className="btn btn-link btn-sm rounded-circle text-secondary" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Grid View">
                            <i className="fas fa-th"></i>
                        </a>

                        {/* <!-- Table View --> */}
                        <a href="/" className="btn btn-link btn-sm rounded-circle me-3 text-secondary active" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Table View">
                            <i className="fas fa-bars"></i>
                        </a>


                        {/* <!-- Add Task/Project --> */}

                        <button className="btn btn-primary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#modalCreateProject">
                            <i className="fas fa-plus" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Add Project" aria-label="Add Project"></i>
                        </button>

                    </div>
                </div>

                <div className="px-3 py-2 hstack gap-1 overflow-auto bg-white-custom border-bottom shadow-sm ">
                    <span className="badge rounded-pill py-2 pe-2 badge-add-filter" data-bs-toggle="modal" href="#modalStart" role="button">
                        Select Filter <i className="fa fa-plus ms-1"></i>
                    </span>

                    <span className="badge badge-light-light rounded-pill text-dark py-2 fw-normal">
                        <i className="fa fa-circle me-1 text-danger"></i>
                        <span className="text-body me-1">Tag</span>Usability <span className="text-body small ms-1">(12)</span>
                        <a href="#" className="text-dark opacity-25 ms-1">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <a href="#" className="badge badge-light-light text-dark rounded-pill py-2 text-decoration-none fw-normal">
                        <i className="fa fa-calendar me-1 text-muted ms-1"></i>
                        <span className="text-body me-1">Date</span>12 January 2019 <span className="text-body small ms-1">(12)</span>
                        <span className="text-dark opacity-25 ms-1">
                            <i className="fa fa-caret-down"></i>
                        </span>
                    </a>

                    <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <div className="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                            <span style={{ fontSize: "10px" }}>JM</span>
                        </div>
                        <span className="text-body me-1">Person</span>Jane Marakesh <span className="text-body small ms-1">(12)</span>
                        <a href="#" className="text-dark opacity-25 ms-2">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <div className="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                            <i className="fa fa-user" style={{ fontSize: "10px" }}></i>
                        </div>
                        <span className="text-body me-1">Person</span>Maria Novakovic <span className="text-body small ms-1">(12)</span>
                        <a href="#" className="text-dark opacity-25 ms-2">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-pill me-2" alt="..." width="20" />
                        <span className="text-body me-1">Person</span>Kayla Moinse <span className="text-body small mx-1">(12)</span>
                        <a href="#" className="text-dark opacity-25 ms-1">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                </div>

                {/* FILTER ROW */}


                <div className=" container-fluid px-0 ">
                    <div className="table-responsive-md">
                        <table className="table table-hover mt-2">
                            <thead className="border-bottom">
                                <tr>
                                    <th scope="col" width="50"></th>
                                    {/* <th scope="col" width="30"></th> */}
                                    <th scope="col" className="small fw-normal">Product</th>
                                    <th scope="col" className="small fw-normal">Category</th>
                                    <th scope="col" className="small fw-normal">Price</th>
                                    <th scope="col" className="small fw-normal">Images</th>
                                    <th scope="col" className="small fw-normal">In stock</th>
                                    <th scope="col" className="small fw-normal text-end">Rating</th>
                                    <th scope="col" className="small fw-normal"></th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr >
            <th scope="row" className="align-middle">
                <div>
                    <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."   onClick={()=>handleCardClick(productState)} />
                </div>
            </th>

            {/* <td className="align-middle">
                <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off" />
                <label className="btn btn-link btn-sm text-body" for="btn-check-outlined">
                    <i className="far fa-fw fa-star"></i>
                </label>
            </td> */}

            <td className="align-middle">
                <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                <a href="/tasks-table.html" className="text-dark pb-0">
                    details.name
                </a>
            </td>

            <td className="align-middle">
                details.category
            </td>

            <td className="align-middle">
                <span className="badge badge-light-light rounded-pill text-dark py-1 fw-normal pe-3 ps-1">
                    <i className="fa fa-pause-circle me-1 text-warning"></i>
                    details.stock
                </span>
            </td>

            <td className="align-middle">

                {/* <!-- START Avatars #4 --> */}
                <div className="d-inline-flex">                  
                    <div className="avatars d-flex">
                       nbx
                    </div>
                </div>


            </td>
            <td className="ps-3 align-middle">

                details.price

            </td>
            <td className="align-middle text-end">

            <div className="btn-group">
                        <button type="button" className="me-3 btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
                            <i className="fa fa-eye small text-body"></i>
                        </button>

                        <div className="dropdown-menu shadow pt-0 rounded-3 pb-0">

                            {/* <!-- Right Close Button --> */}
                            <span className="position-absolute top-0 start-100 translate-middle" style={{ zIndex: "999" }}>
                                <span className="fa-stack" style={{ fontSize: " 0.7em" }}>
                                    <i className="fa fa-circle fa-stack-2x text-dark"></i>
                                    <i className="fa fa-times fa-stack-1x text-white"></i>
                                </span>
                            </span>


                            <div className="px-3 py-2 d-flex align-items-center bg-light small border-top">
                                <small> Apply people for this task</small>
                            </div>

                            <ul className="overflow-auto list-unstyled mb-0 vstack" style={{ height: "200px", gap: "1px" }}>
                                <li>
                                    <a className="dropdown-item d-flex py-2" href="#" data-bs-toggle="button">
                                        <img className="avatar-sm rounded-pill me-3" src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                                        <span className="flex-grow-1 align-self-center me-5">Rakesh Maraiop</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex py-2" href="#" data-bs-toggle="button">
                                        <div className="avatar-sm rounded-pill bg-secondary small text-white d-flex align-items-center justify-content-center text-wrap small me-3">
                                            <small>
                                                <i className="fa fa-user"></i>
                                            </small>
                                        </div>
                                        <span className="flex-grow-1 align-self-center me-5">Adam Sandler</span>
                                    </a>
                                </li>

                            </ul>

                            <div className="hstack p-0 d-flex align-items-center bg-light small text-muted border-top rounded-bottom">
                                <button type="button" className="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
                                    Edit Users
                                </button>

                                <div className="vr m-0 bg-gray-600"></div>

                                <button type="button" className="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
                                    Add Users
                                </button>
                            </div>
                        </div>

                    </div>

                details.rating
            </td>
            <td className="align-middle text-end">
                {/* <!-- START Dropdown: Options --> */}
                <div className="btn-group  dropdown ">
                    <button className="btn btn-link text-decoration-none btn-sm text-secondary rounded-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-h fa-fw"></i>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton1">
                        <li><h6 className="dropdown-header fw-normal">Options</h6></li>
                        <li>
                            <a className="dropdown-item gap-2 d-flex" href="#">
                                <i className="fa fa-pen fa-fw me-2 opacity-50 align-self-center"></i> Edit this Task
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item gap-2 d-flex" href="#">
                                <i className="fa fa-calendar fa-fw me-2 opacity-50 align-self-center"></i> Due Date
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item gap-2 d-flex" href="#">
                                <i className="fa fa-list fa-fw me-2 opacity-50 align-self-center"></i> Add Subtask
                            </a>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>

                            <button type="button" className="dropdown-item gap-2 d-flex" data-bs-toggle="modal" data-bs-target="#modalDanger">
                                <i className="fa fa-trash fa-fw me-2 opacity-50 align-self-center"></i> Delete
                            </button>

                        </li>
                    </ul>
                </div>
                {/* <!-- END Dropdown: Options --> */}
            </td>
        </tr>
                                {/* {products ?
                                    products.map(x => {
                                        return (
                                            <Product details={x} />
                                        )
                                    })
                                    : <div className='d-flex justify-content-center align-items-center'><h1>...Loading</h1></div>
                                } */}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {visibility && <Modal />}


        </>
    )

}
export default Dashboard