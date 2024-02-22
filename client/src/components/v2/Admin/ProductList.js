import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { invokeToast } from '../redux/toastSlice';
import { setLoaderVisibility } from '../redux/loaderSlice';
import { isProductUpdated } from '../redux/productSlice';
import { setProductFormVisibility, setProductFormTitle, setProductForm } from '../redux/productFormSlice'

const Product = ({ details, areLastTwoRow }) => {

    const dispatch = useDispatch()
    const productFormVisibility = useSelector(state => state.productForm.visibility)// modal's visibility

    const handlEditProduct = (product) => {
        dispatch(setProductForm(product)) //setting the product form with currently selected product for editing
        dispatch(setProductFormVisibility({ visibility: !productFormVisibility })); //setting modal's visibility
        dispatch(setProductFormTitle({ title: "Edit product" })) // setting modal's title
    };

    //product image preview on hover 
    const showImagePreview = (e) => {
        const previewElemm = e.target.nextElementSibling;
        const bgElem = e.target.parentElement.querySelector('.bg-img-preview');

        previewElemm.style.backgroundImage = e.target.style['background-image']//placing the same image to the hover preview
        previewElemm.classList.add('display-block')
        bgElem.classList.add('display-block')
        if (areLastTwoRow) {
            previewElemm.classList.add('bottom100')
            bgElem.classList.add('bottom100')
        }
    }

    const hideImagePreview = (e) => {
        e.target.nextElementSibling.classList.remove('display-block')
        e.target.parentElement.querySelector('.bg-img-preview').classList.remove('display-block')//hiding the image backgorund
    }

    //set product visibility
    async function setProductVisibility(e, details) {
        dispatch(setLoaderVisibility({ loader: true }))//loader turned on
        e.target.classList.toggle('clr-red')
        let resp;
        fetch("/api/admin/productvisibility", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: details._id, visibility: !details.visibility
            }),
        })
            .then(response => {
                resp = response
                return response.json()
            })
            .then(data => {
                dispatch(setLoaderVisibility({ loader: false }))//loader turned off
                if (resp.status === 200) {
                    dispatch(invokeToast({ isSuccess: true, message: data.message }))
                } else {
                    dispatch(invokeToast({ isSuccess: false, message: data.message }))
                }
            })
    }

    function deleteProduct(id) {
        dispatch(setLoaderVisibility({ loader: true }))
        let resp;
        fetch("/api/admin/deleteproduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id
            }),
        })
            .then(response => {
                resp = response
                return response.json()
            })
            .then(data => {
                dispatch(setLoaderVisibility({ loader: false }))
                if (resp.status === 200) {
                    dispatch(invokeToast({ isSuccess: true, message: data.message }))
                    dispatch(isProductUpdated({ updateProduct: true }))//reloading the product list to show updated list
                } else {
                    dispatch(invokeToast({ isSuccess: false, message: data.message }))
                }
            })
    }

    return (
        <tr key={details._id}>
            <th scope="row" className="align-middle">
                <div className='text-center'>
                    <i className="fa fa-edit font-weight-100 pointer" onClick={() => handlEditProduct(details)}></i>
                </div>
            </th>

            {/* <td className="align-middle">
                <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off" />
                <label className="btn btn-link btn-sm text-body" for="btn-check-outlined">
                    <i className="far fa-fw fa-star"></i>
                </label>
            </td> */}

            <td className="align-middle ellipsis">
                <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                <span className="text-dark pb-0">
                    {details.name}
                </span>
            </td>

            <td className="align-middle text-capitalize">
                {details.category}
            </td>

            <td className="align-middle">
                <span className="badge badge-light-light rounded-pill text-dark py-1 fw-normal pe-3 ps-1">
                    <i className="fa fa-rupee me-1 text-warning"></i>
                    {details.price}
                </span>
            </td>

            <td className="align-middle">
                <div className="d-inline-flex">
                    <div className="avatars d-flex position-relative">
                        {details.image.map(x => {
                            return (<>
                                <div className="avatars__item pointer" onMouseEnter={(e) => showImagePreview(e)} onMouseLeave={(e) => hideImagePreview(e)} style={{ background: `url(${x})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div>
                                <div className='image-preview'></div>
                            </>
                            )
                        })}
                        <section className='bg-img-preview'></section>
                    </div>
                </div>
            </td>

            <td className="ps-3 align-middle">
                {details.discount}
            </td>

            <td className="ps-3 align-middle">
                {details.stock}
            </td>

            <td className="align-middle text-center">
                <div className="btn-group">
                    {/* <button type="button" className="me-3 btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
                        <i className="fa fa-expand small text-body"></i>
                    </button> */}

                    {/* <div className="dropdown-menu shadow pt-0 rounded-3 pb-0">
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
                                <a className="dropdown-item d-flex py-2" href="/#" data-bs-toggle="button">
                                    <img className="avatar-sm rounded-pill me-3" src="https://randomuser.me/api/portraits/women/65.jpg" alt="shoppitt" />
                                    <span className="flex-grow-1 align-self-center me-5">Rakesh Maraiop</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item d-flex py-2" href="/#" data-bs-toggle="button">
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
                    </div> */}
                </div>
                {details.rating}
            </td>

            <td className="ps-3 align-middle text-center">
                <button type="button" className=" btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" style={{ height: "26px !important", width: "26px !important" }}>
                    <i onClick={(e) => setProductVisibility(e, details)} className={`fa fa-eye small text-body ${!details.visibility && "clr-red"}`}></i>
                </button>
            </td>

            <td className="align-middle text-end">
                {/* <!-- START Dropdown: Options --> */}
                <div className="btn-group  dropdown ">
                    <button className="btn btn-link text-decoration-none btn-sm text-secondary rounded-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-h fa-fw"></i>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton1">
                        {/* <li><h6 className="dropdown-header fw-normal">Options</h6></li>
                        <li>
                            <a className="dropdown-item gap-2 d-flex" href="/#">
                                <i className="fa fa-pen fa-fw me-2 opacity-50 align-self-center"></i> Edit this Task
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item gap-2 d-flex" href="/#">
                                <i className="fa fa-calendar fa-fw me-2 opacity-50 align-self-center"></i> Due Date
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item gap-2 d-flex" href="/#">
                                <i className="fa fa-list fa-fw me-2 opacity-50 align-self-center"></i> Add Subtask
                            </a>
                        </li>
                        <li><hr className="dropdown-divider" /></li> */}
                        <li>
                            <button type="button" className="dropdown-item gap-2 d-flex pointer" onClick={() => deleteProduct(details._id)}>
                                <i className="fa fa-trash fa-fw me-2 opacity-50 align-self-center"></i> Delete
                            </button>
                        </li>
                    </ul>
                </div>
                {/* <!-- END Dropdown: Options --> */}
            </td>
        </tr>
    )
}

export default Product