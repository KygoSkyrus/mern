import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility, setProductFormTitle, setProductForm } from './../redux/todoSlice'




import Modal from './../Modal'

const Dashboard = () => {

    const [products, setProducts] = useState() //to set products fetched from server


    const visibility = useSelector(state => state.productFormVisibility.visibility)// modal's visibility
    const dispatch = useDispatch()


    const handleCardClick = (product) => {
        dispatch(setProductForm(product)) //setting the product form with currently selected product for editing
        dispatch(productFormVisibility({ visibility: !visibility })); //setting modal's visibility
        dispatch(setProductFormTitle({title:"Edit product"})) // setting modal's title
    };

    
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


    return (
        <>
            <div id="x"></div>
            <div >

                <div class="p-3 overflow-auto d-flex  bg-white border-bottom shadow-sm ">

                    {/* <!-- Left Side--> */}
                    <div class="d-flex flex-grow-1">



                        <h6 class="align-self-center mb-0 me-3 fw-semibold text-nowrap">

                            Projects

                        </h6>


                        {/* <!-- START Dropdown: Bulk Options--> */}
                        <div class="dropdown">
                            <button class="btn btn-sm btn-link text-decoration-none text-muted dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-cog"></i>
                            </button>
                            <ul class="dropdown-menu shadow rounded-4" aria-labelledby="dropdownMenuButton1">
                                <li><h6 class="dropdown-header fw-normal">Bulk Options</h6></li>
                                <li>
                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                        <i class="fa fa-star fa-fw me-2 me-2 text-muted opacity-50 align-self-center"></i>
                                        Add to Favorites
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                        <i class="fa fa-align-right fa-fw text-muted me-2 opacity-50 align-self-center"></i>
                                        Select Priority
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                        <i class="fa fa-signal fa-fw  me-2 text-muted opacity-50 align-self-center"></i>
                                        Select Status
                                    </a>
                                </li>
                                <li>
                                    <button class="dropdown-item gap-2 d-flex" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectUsers">
                                        <i class="fa fa-user fa-fw me-2 text-muted opacity-50 align-self-center"></i>
                                        Assign Users
                                    </button>
                                </li>
                                <li><hr class="dropdown-divider" /></li>
                                <li>
                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                        <i class="fa fa-trash fa-fw text-muted me-2 opacity-50 align-self-center"></i>
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- END Dropdown: Bulk Options--> */}

                    </div>

                    {/* <!-- Right Side--> */}
                    <div class="d-flex h-stack gap-1">

                        {/* <!-- List View --> */}
                        <a href="/projects-list.html" class="btn btn-link btn-sm rounded-circle text-secondary

								
									" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="List View">
                            <i class="fas fa-columns"></i>
                        </a>

                        {/* <!-- Grid View --> */}
                        <a href="/projects-grid.html" class="btn btn-link btn-sm rounded-circle text-secondary
							
								
									" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Grid View">
                            <i class="fas fa-th"></i>
                        </a>

                        {/* <!-- Table View --> */}
                        <a href="/" class="btn btn-link btn-sm rounded-circle me-3 text-secondary 
							
								
									active" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Table View">
                            <i class="fas fa-bars"></i>
                        </a>


                        {/* <!-- Add Task/Project --> */}

                        <button class="btn btn-primary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#modalCreateProject">
                            <i class="fas fa-plus" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Add Project" aria-label="Add Project"></i>
                        </button>

                    </div>
                </div>

                <div class="px-3 py-2 hstack gap-1 overflow-auto  bg-white border-bottom shadow-sm ">
                    <span class="badge rounded-pill py-2 pe-2 badge-add-filter" data-bs-toggle="modal" href="#modalStart" role="button">
                        Select Filter <i class="fa fa-plus ms-1"></i>
                    </span>

                    <span class="badge badge-light-light rounded-pill text-dark py-2 fw-normal">
                        <i class="fa fa-circle me-1 text-danger"></i>
                        <span class="text-body me-1">Tag</span>Usability <span class="text-body small ms-1">(12)</span>
                        <a href="#" class="text-dark opacity-25 ms-1">
                            <i class="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <a href="#" class="badge badge-light-light text-dark rounded-pill py-2 text-decoration-none fw-normal">
                        <i class="fa fa-calendar me-1 text-muted ms-1"></i>
                        <span class="text-body me-1">Date</span>12 January 2019 <span class="text-body small ms-1">(12)</span>
                        <span class="text-dark opacity-25 ms-1">
                            <i class="fa fa-caret-down"></i>
                        </span>
                    </a>

                    <span class="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <div class="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                            <span style={{ fontSize: "10px" }}>JM</span>
                        </div>
                        <span class="text-body me-1">Person</span>Jane Marakesh <span class="text-body small ms-1">(12)</span>
                        <a href="#" class="text-dark opacity-25 ms-2">
                            <i class="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <span class="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <div class="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                            <i class="fa fa-user" style={{ fontSize: "10px" }}></i>
                        </div>
                        <span class="text-body me-1">Person</span>Maria Novakovic <span class="text-body small ms-1">(12)</span>
                        <a href="#" class="text-dark opacity-25 ms-2">
                            <i class="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <span class="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <img src="https://randomuser.me/api/portraits/women/65.jpg" class="rounded-pill me-2" alt="..." width="20" />
                        <span class="text-body me-1">Person</span>Kayla Moinse <span class="text-body small mx-1">(12)</span>
                        <a href="#" class="text-dark opacity-25 ms-1">
                            <i class="fa fa-times-circle"></i>
                        </a>
                    </span>

                </div>

                <div class=" container-fluid px-0 ">
                    <div class="table-responsive-md">
                        <table class="table table-hover mt-2">
                            <thead class="border-bottom">
                                <tr>
                                    <th scope="col" width="30"></th>
                                    <th scope="col" width="30"></th>
                                    <th scope="col" class="small fw-normal">Product</th>
                                    <th scope="col" class="small fw-normal">Category</th>
                                    <th scope="col" class="small fw-normal">Price</th>
                                    <th scope="col" class="small fw-normal">Images</th>
                                    <th scope="col" class="small fw-normal">In stock</th>
                                    <th scope="col" class="small fw-normal text-end">Rating</th>
                                    <th scope="col" class="small fw-normal"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" class="align-middle">
                                        <div>
                                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                        </div>
                                    </th>
                                    <td class="align-middle">
                                        <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off" />
                                        <label class="btn btn-link btn-sm text-body" for="btn-check-outlined">
                                            <i class="far fa-fw fa-star"></i>
                                        </label>
                                    </td>
                                    <td class="align-middle">
                                        <i class="fa fa-circle fa-fw me-2 text-indigo"></i>
                                        <a href="/tasks-table.html" class="text-dark pb-0">
                                            Cloned object-oriented protocol
                                        </a>
                                    </td>
                                    <td class="align-middle">
                                        Tue, 28 Feb, 2017
                                    </td>
                                    <td class="align-middle">
                                        Thu, 28 Feb, 2011
                                    </td>
                                    <td class="align-middle">

                                        {/* <!-- START Avatars #4 --> */}
                                        <div class="d-inline-flex">
                                            {/* <!-- Edit --> */}
                                            <div class="btn-group">
                                                <button type="button" class="me-3 btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
                                                    <i class="far fa-pen small text-body"></i>
                                                </button>
                                                {/* <!-- START Dropdown Autocomplete --> */}
                                                <div class="dropdown-menu shadow pt-0 rounded-3 pb-0">

                                                    {/* <!-- Right Close Button --> */}
                                                    <span class="position-absolute top-0 start-100 translate-middle" style={{ zIndex: "999" }}>
                                                        <span class="fa-stack" style={{ fontSize: " 0.7em" }}>
                                                            <i class="fas fa-circle fa-stack-2x text-dark"></i>
                                                            <i class="far fa-times fa-stack-1x text-white"></i>
                                                        </span>
                                                    </span>

                                                    

                                                    {/* <!-- START Header --> */}
                                                    <div class="px-3 py-2 d-flex align-items-center bg-light small border-top">
                                                        <small> Apply people for this task</small>
                                                    </div>
                                                    {/* <!-- END Header --> */}

                                                    {/* <!-- START List --> */}
                                                    <ul class="overflow-auto list-unstyled mb-0 vstack" style={{ height: "200px", gap: "1px" }}>
                                                        <li>
                                                            <a class="dropdown-item d-flex py-2" href="#" data-bs-toggle="button">
                                                                <img class="avatar-sm rounded-pill me-3" src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                                                                <span class="flex-grow-1 align-self-center me-5">Rakesh Maraiop</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="dropdown-item d-flex py-2" href="#" data-bs-toggle="button">
                                                                <div class="avatar-sm rounded-pill bg-secondary small text-white d-flex align-items-center justify-content-center text-wrap small me-3">
                                                                    <small>
                                                                        <i class="fa fa-user"></i>
                                                                    </small>
                                                                </div>
                                                                <span class="flex-grow-1 align-self-center me-5">Adam Sandler</span>
                                                            </a>
                                                        </li>

                                                    </ul>
                                                    {/* <!-- END List --> */}

                                                    {/* <!-- START Footer --> */}
                                                    <div class="hstack p-0 d-flex align-items-center bg-light small text-muted border-top rounded-bottom">
                                                        <button type="button" class="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
                                                            Edit Users
                                                        </button>

                                                        <div class="vr m-0 bg-gray-600"></div>

                                                        <button type="button" class="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
                                                            Add Users
                                                        </button>
                                                    </div>
                                                    {/* <!-- END Footer --> */}
                                                </div>
                                                {/* <!-- END Dropdown Autocomplete --> */}
                                            </div>
                                            {/* <!-- Members --> */}
                                            <div class="avatars d-flex">
                                                <div class="avatars__item">
                                                    <img class="rounded-3" src="images/avatars/1.jpg" alt="" />
                                                </div>
                                                <div class="avatars__item">
                                                    <img class="rounded-3" src="images/avatars/15.jpg" alt="" />
                                                </div>
                                                <div class="avatars__item">
                                                    <img class="rounded-3" src="images/avatars/49.jpg" alt="" />
                                                </div>
                                                <div class="avatars__item">
                                                    <img class="rounded-3" src="images/avatars/43.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- END Avatars #4 --> */}


                                    </td>
                                    <td class="ps-3 align-middle">

                                        <span class="badge badge-light-light rounded-pill text-dark py-1 fw-normal pe-3 ps-1">
                                            <i class="fa fa-pause-circle me-1 text-warning"></i>
                                            Paused
                                        </span>

                                    </td>
                                    <td class="align-middle text-end">
                                        50%
                                    </td>
                                    <td class="align-middle text-end">
                                        {/* <!-- START Dropdown: Options --> */}
                                        <div class="btn-group  dropdown ">
                                            <button class="btn btn-link text-decoration-none btn-sm text-secondary rounded-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa fa-ellipsis-h fa-fw"></i>
                                            </button>

                                            <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton1">
                                                <li><h6 class="dropdown-header fw-normal">Options</h6></li>
                                                <li>
                                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                                        <i class="fa fa-pen fa-fw me-2 opacity-50 align-self-center"></i> Edit this Task
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                                        <i class="fa fa-calendar fa-fw me-2 opacity-50 align-self-center"></i> Due Date
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item gap-2 d-flex" href="#">
                                                        <i class="fa fa-list fa-fw me-2 opacity-50 align-self-center"></i> Add Subtask
                                                    </a>
                                                </li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li>

                                                    <button type="button" class="dropdown-item gap-2 d-flex" data-bs-toggle="modal" data-bs-target="#modalDanger">
                                                        <i class="fa fa-trash fa-fw me-2 opacity-50 align-self-center"></i> Delete
                                                    </button>

                                                </li>
                                            </ul>
                                        </div>
                                        {/* <!-- END Dropdown: Options --> */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>




                {products ?
                    products.map(x => {
                        return (
                            <div className='m-2 bg-dark text-light p-2' key={x._id}>
                                <section>name - {x.name}</section>
                                <button onClick={() => handleCardClick(x)}>..</button>
                                {/* on click here show the modal but also create a state which will be updated with the clicked prodict and in the product form selector function will gte the product state */}
                                {/* {x.image.map(img= >(<img src={img} alt={x.name} width='300px' />))} */}
                            </div>
                        )
                    })
                    : <div className='d-flex justify-content-center align-items-center'><h1>...Loading</h1></div>
                }

            </div>

            {visibility && <Modal/>}


        </>
    )

}
export default Dashboard