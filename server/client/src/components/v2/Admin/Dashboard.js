import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isProductUpdated } from './../redux/todoSlice'


import Modal from './../Modal'
import Product from './ProductList'

const Dashboard = () => {

    const filters=useRef();
    const appliedFilters=useRef();
    const [products, setProducts] = useState(false) //to set products fetched from server
    const visibility = useSelector(state => state.productFormVisibility.visibility)// modal's visibility 
    const isUpdated = useSelector(state => state.isUpdated.product)


    const dispatch = useDispatch()

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

    const selectFilter = () => {
        console.log('select filter',filters.current.classList)
        filters.current.classList.remove('d-none')
    }


    return (
        <>

            <div >
                {/* THE HEADER */}
                <div className=' dash-header'>
                    <div className="p-3 overflow-auto d-flex bg-white-custom border-bottom shadow-sm">

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

                            <button className="btn btn-light btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#modalCreateProject">
                                <i className="fas fa-plus" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Add Project" aria-label="Add Project"></i>
                            </button>

                        </div>
                    </div>

                    <div className="px-3 py-2 gap-1 bg-white-custom border-bottom shadow-sm d-flex align-items-center position-relative">
                        <span className="badge rounded-pill py-2 pe-2 badge-add-filter" data-bs-toggle="modal" href="#modalStart" role="button" onClick={e => selectFilter()}>
                            Select Filter <i className="fa fa-plus ms-1"></i>
                        <div className='filters rounded-1 px-3 py-2 gap-1 bg-white shadow-m' ref={filters}>
                            <section className='p-2 rounded-pill bg-light'>Catetrrreregory 1</section>
                            <section className='p-2 rounded-pill bg-light'>Category 1</section>
                            <section className='p-2 rounded-pill bg-light'>Category 1</section>
                            <section className='p-2 rounded-pill bg-light'>Caterregory 1</section>
                            <section className='p-2 rounded-pill bg-light'>Category 1</section>
                            <section className='p-2 rounded-pill bg-light'>Categreory 1</section>
                            <section className='p-2 rounded-pill bg-light'>Category 1</section>
                            <section className='p-2 rounded-pill bg-light'>Category 1</section>
                        </div>
                        </span>
                        <div className='hstack overflow-auto gap-1 py-2' ref={appliedFilters}>
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
                    </div>
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
                                    <th scope="col" className="small fw-normal">Discount(%)</th>
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
export default Dashboard