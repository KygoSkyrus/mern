import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 import { isProductUpdated } from './../redux/todoSlice'




import Modal from './../Modal'
import Product from './ProductList'
// import okayIcon from "./../../../assets/images/okay-icon.png"

const Dashboard = () => {

    const [products, setProducts] = useState(false) //to set products fetched from server
    //const [isUpdated,setIsUpdated]=useState()
    const visibility = useSelector(state => state.productFormVisibility.visibility)// modal's visibility 
    const isUpdated = useSelector(state => state.isUpdated.product)

    const dispatch =useDispatch()

    useEffect(() => {
        console.log('ue in hp')
        fetch('/api/getproducts', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                console.log('products', data)
                setProducts(data)//save this data in redux
                dispatch(isProductUpdated({ updateProduct: false }))//setting to false after reloading the product list
            })
    }, [isUpdated])




    const productState = {
        name: "xx", url: "xx", price: 2, description: "x", category: "first", image: ["https:/?njdsj"], stock: 0
    }




    return (
        <>
            <div id="x"></div>
            <div >


                {/* THE HEADER */}
                <div className="p-3 overflow-auto d-flex  bg-white-custom border-bottom shadow-sm ">

                    {/* <!-- Left Side--> */}
                    <div className="d-flex flex-grow-1 align-items-center">
                        <h6 className="align-self-center mb-0 me-3 fw-semibold text-nowrap">
                            Products
                        </h6>
                        <i className="fa-solid fa-shopping-bag"></i>
                    </div>

                    {/* <!-- Right Side--> */}
                    <div className="d-flex h-stack gap-1 position-relative">

                        {/* Dark Mode */}
                        <div className='btn'>
                            <input className="checkbox" type="checkbox" id="toggle" onChange={() => {
                                document.querySelector('.adminView').classList.toggle('dark');
                                document.querySelectorAll('.bg-white-custom').forEach(x => { x.classList.toggle('dark') })
                            }} />
                            <label className="toggle" htmlFor="toggle">
                                <ion-icon className="icon icon--light" name="sunny-outline"></ion-icon>
                                <ion-icon className="icon icon--dark" name="moon-outline"></ion-icon>
                                <span className="ball"></span>
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
                        <a href="/#" className="text-dark opacity-25 ms-1">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <a href="/#" className="badge badge-light-light text-dark rounded-pill py-2 text-decoration-none fw-normal">
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
                        <a href="/#" className="text-dark opacity-25 ms-2">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <div className="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                            <i className="fa fa-user" style={{ fontSize: "10px" }}></i>
                        </div>
                        <span className="text-body me-1">Person</span>Maria Novakovic <span className="text-body small ms-1">(12)</span>
                        <a href="/#" className="text-dark opacity-25 ms-2">
                            <i className="fa fa-times-circle"></i>
                        </a>
                    </span>

                    <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                        <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-pill me-2" alt="..." width="20" />
                        <span className="text-body me-1">Person</span>Kayla Moinse <span className="text-body small mx-1">(12)</span>
                        <a href="/#" className="text-dark opacity-25 ms-1">
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
                                    <th scope="col" className="small fw-normal text-center">Visibility</th>
                                    <th scope="col" className="small fw-normal"></th>
                                </tr>
                            </thead>
                            <tbody>                      
                                {products ?
                                    products.map(x => {
                                        return (
                                            <Product details={x} key={x._id} />
                                        )
                                    })
                                    : <tr className='d-flex justify-content-center align-items-center'><td><h1>...Loading</h1></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {visibility && <Modal />}


        </>
    )

}
//  <tr >
// <th scope="row" className="align-middle">
//     <div>
//         <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." onClick={() => handleCardClick(productState)} />
//     </div>
// </th>



// <td className="align-middle">
//     <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
//     <a href="/tasks-table.html" className="text-dark pb-0">
//         details.name
//     </a>
// </td>

// <td className="align-middle">
//     details.category
// </td>

// <td className="align-middle">
//     <span className="badge badge-light-light rounded-pill text-dark py-1 fw-normal pe-3 ps-1">
//         <i className="fa fa-pause-circle me-1 text-warning"></i>
//         details.stock
//     </span>
// </td>

// <td className="align-middle">

//     <div className="d-inline-flex">
//         <div className="avatars d-flex">
//             <div className="avatars__item pointer" onMouseEnter={(e) => imagePreview(e)} onMouseLeave={(e) => hideImagePreview(e)} style={{ background: `url(${okayIcon})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "relative" }}>
//                 <div className='image-preview'></div>
//             </div>
//         </div>
//     </div>


// </td>
// <td className="ps-3 align-middle">

//     details.price

// </td>
// <td className="align-middle text-end">

//     <div className="btn-group">
//         <button type="button" className="me-3 btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
//             <i className="fa fa-eye small text-body"></i>
//         </button>

//         <div className="dropdown-menu shadow pt-0 rounded-3 pb-0">

//             <span className="position-absolute top-0 start-100 translate-middle" style={{ zIndex: "999" }}>
//                 <span className="fa-stack" style={{ fontSize: " 0.7em" }}>
//                     <i className="fa fa-circle fa-stack-2x text-dark"></i>
//                     <i className="fa fa-times fa-stack-1x text-white"></i>
//                 </span>
//             </span>


//             <div className="px-3 py-2 d-flex align-items-center bg-light small border-top">
//                 <small> Apply people for this task</small>
//             </div>

//             <ul className="overflow-auto list-unstyled mb-0 vstack" style={{ height: "200px", gap: "1px" }}>
//                 <li>
//                     <a className="dropdown-item d-flex py-2" href="/#" data-bs-toggle="button">
//                         <img className="avatar-sm rounded-pill me-3" src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
//                         <span className="flex-grow-1 align-self-center me-5">Rakesh Maraiop</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a className="dropdown-item d-flex py-2" href="/#" data-bs-toggle="button">
//                         <div className="avatar-sm rounded-pill bg-secondary small text-white d-flex align-items-center justify-content-center text-wrap small me-3">
//                             <small>
//                                 <i className="fa fa-user"></i>
//                             </small>
//                         </div>
//                         <span className="flex-grow-1 align-self-center me-5">Adam Sandler</span>
//                     </a>
//                 </li>

//             </ul>

//             <div className="hstack p-0 d-flex align-items-center bg-light small text-muted border-top rounded-bottom">
//                 <button type="button" className="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
//                     Edit Users
//                 </button>

//                 <div className="vr m-0 bg-gray-600"></div>

//                 <button type="button" className="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
//                     Add Users
//                 </button>
//             </div>
//         </div>

//     </div>

//     details.rating
// </td>
// <td className="align-middle text-end">
//     <div className="btn-group  dropdown ">
//         <button className="btn btn-link text-decoration-none btn-sm text-secondary rounded-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//             <i className="fa fa-ellipsis-h fa-fw"></i>
//         </button>

//         <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton1">
//             <li><h6 className="dropdown-header fw-normal">Options</h6></li>
//             <li>
//                 <a className="dropdown-item gap-2 d-flex" href="/#">
//                     <i className="fa fa-pen fa-fw me-2 opacity-50 align-self-center"></i> Edit this Task
//                 </a>
//             </li>
//             <li>
//                 <a className="dropdown-item gap-2 d-flex" href="/#">
//                     <i className="fa fa-calendar fa-fw me-2 opacity-50 align-self-center"></i> Due Date
//                 </a>
//             </li>
//             <li>
//                 <a className="dropdown-item gap-2 d-flex" href="/#">
//                     <i className="fa fa-list fa-fw me-2 opacity-50 align-self-center"></i> Add Subtask
//                 </a>
//             </li>
//             <li><hr className="dropdown-divider" /></li>
//             <li>

//                 <button type="button" className="dropdown-item gap-2 d-flex" data-bs-toggle="modal" data-bs-target="#modalDanger">
//                     <i className="fa fa-trash fa-fw me-2 opacity-50 align-self-center"></i> Delete
//                 </button>

//             </li>
//         </ul>
//     </div>
// </td>
// </tr> 
export default Dashboard