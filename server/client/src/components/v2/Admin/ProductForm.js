import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { setProductFormVisibility, clearProductForm } from '../redux/productFormSlice'
import { setLoaderVisibility } from '../redux/loaderSlice';
import { isProductUpdated } from '../redux/productSlice';
import { invokeToast } from '../redux/toastSlice';

const ProductForm = (props) => {

    const dispatch = useDispatch()
    const [categories, setCategories] = useState()
    const [productData, setProductData] = React.useState({})
    const title = useSelector(state => state.productForm.title)
    const productState = useSelector(state => state.productForm.productData)
    // console.log('pddd', productState, title)

    const storage = getStorage(props.firebaseApp);

    useEffect(() => {
        console.log('------productState----', productState)
        setProductData(productState)//setting the inputs with selected product details on edit
        fetch('/api/getcategory')
            .then(res => res.json())
            .then(res => {
                setCategories(res.filter(item => item.subCategory.length === 0))
            })
    }, [])
    console.log('resss', categories)

    const closeProductFormContainer = () => {
        dispatch(setProductFormVisibility({ visibility: false }));
    }

    async function sendData(e) {
        e.preventDefault()//this stops page to refresh if the form submission is used with type submit button

        dispatch(setLoaderVisibility({ loader: true }))

        console.log('pd', productData, productState)

        let tempArr = [];
        //when images are chnaged (will run for : newProduct/editProduct)
        if (productData.image !== productState.image) {

            console.log('insite upload', typeof (productData.image), typeof (productState.image))

            Array.from(productData.image).forEach(async (x, index) => {
                console.log(index + ": ", x)

                let imageRef = ref(storage, "shoppitt/" + uuidv4());

                const uploadTask = uploadBytesResumable(imageRef, x);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default: console.log('');
                                break
                        }
                    },
                    (error) => {
                        console.log(error)
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                tempArr.push(downloadURL)
                                if (index === productData.image.length - 1 && downloadURL) addProductAPI(tempArr)
                            });
                        console.log('---------------------------------->>>>>>>>>>>>>>>>>')
                    }
                );

            })
        } else {
            //when images are not chnaged (will run for : editProduct) ONLY [bcz newproduct doest fire unless image is slected]
            console.log('no new images are there')
            if (JSON.stringify(productData) !== JSON.stringify(productState)) {
                //when things other than images are changed
                console.log('----------------------caalomg apo')
                closeProductFormContainer()//closing modal
                addProductAPI(undefined)
            } else {
                //nothing changed
                dispatch(clearProductForm())//clearing form
                closeProductFormContainer()//closing modal

                dispatch(setLoaderVisibility({ loader: false }))
                // invokeToast(dispatch,true,`No changes were made`)
                dispatch(invokeToast({isSuccess:true,message:'No changes were made'}))
            }

        }
        //we should avoid using url,, just use a template to show product and send data when its clicked
    }

    function addProductAPI(image) {

        let apiURL;
        let img = image;//for add product
        if (title === "Edit product") {
            apiURL = "/api/admin/editproduct";
            if (image) {
                img = [productState.image, image].flat()
            } else {
                img = productData.image;
            }
        } else {
            apiURL = "/api/admin/addproducts";
        }

        // NOTE::(UPDATE:::ITS WORKING NOW)TRY CHECKING WITH MULTIPLE IMAGES,,maybe bcz if internet is not working...image is troubling//also when edited is done,,then its giving cannot remoeve child from node errror on clearform function///last image from newly added image is being left behind
        let resp;
        fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: productData.name,
                url: productData.url,
                price: productData.price,
                description: productData.description,
                category: productData.category,
                stock: productData.stock,
                discount: productData.discount,
                image: img,
                id: productData._id
            }),
        })
            .then(response => {
                resp = response;
                return response.json()
            })
            .then(data => {
                dispatch(setLoaderVisibility({ loader: false }))

                if (resp.status === 200) {
                    // invokeToast(dispatch,true,data.message)
                    dispatch(invokeToast({isSuccess:true,message:data.message}))
                    //also to do thta you need to store the all the product in redux and then the edited product can be updated there
                    dispatch(isProductUpdated({ updateProduct: true }))//reloading the product list to show updated list
                } else {
                    // invokeToast(dispatch,false,data.message)
                    dispatch(invokeToast({isSuccess:false,message:data.message}))
                }
            })
            .catch(err => console.log(err))

    }

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    function settingUrl(e) {
        let title = e.target.value;
        let str = title.replace(/\s+/g, "-").toLowerCase();
        document.getElementById("url").value = str;
        setProductData({ ...productData, [e.target.name]: e.target.value, url: str })
    }

    function setDynamicLabel(e) {
        //you can write the logic to create the object url and store it in array state wihich will update the image holder like in edit componnent
        // console.log('setdynmaic')
        let imageHolder = document.getElementById('imageHolder')
        imageHolder.innerHTML = "";
        if (title === "Edit product") {
            //re add the exiting image here
            productState.image?.map(x => {
                let div = document.createElement('div')
                div.classList.add('displayimg')
                div.style.backgroundImage = `url('${x}')`
                imageHolder.appendChild(div)
            })
        }
        if (e.target.files) {
            document.getElementById("dynamicLabel").innerHTML = e.target.files[0]?.name;
            if (imageHolder) {
                Array.from(e.target.files).forEach(x => {
                    let div = document.createElement('div')
                    div.classList.add('displayimg')
                    div.style.backgroundImage = `url('${URL.createObjectURL(x)}')`
                    imageHolder.appendChild(div)
                })
            }
            setProductData({ ...productData, [e.target.name]: e.target.files })//this is needed for new product as this goes to send data where the image is uploaded to firrstore but in edit this is messing up with displa img
        } else {
            document.getElementById("dynamicLabel").innerHTML = "Choose a file…"
        }
        // console.log('SETDYNAM END')
    }
    // ADD PRODUCT--------------------------------------

    return (
        <>
            <div className="card productForm">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="fs-17 font-weight-600 mb-0">{title}</h6>
                        </div>
                        <div className="text-right pointer closeBtn">
                            <div className="actions">
                                <span
                                    onClick={()=>closeProductFormContainer()}
                                    className="action-item cursor-pointer" >
                                    <i
                                        className="fas fa-times">
                                    </i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                            <form id="frm" onSubmit={e => sendData(e)}>
                                <div className="form-group">
                                    <label htmlFor="name" className="font-weight-600">Product name</label>
                                    <input type="text" className="form-control" name="name" id="name"
                                        value={productData?.name} autoComplete="off" placeholder="product name" onChange={e => settingUrl(e)} required />
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="url" className="font-weight-600">Product Url</label> */}
                                    <input type="hidden" className="form-control" name="url" id="url"
                                        autoComplete="off" placeholder="Product URL" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price" className="font-weight-600">Price</label>
                                    <input type='number' name="price" placeholder="price" className="form-control"
                                        id="price" required value={productData?.price} onChange={e => handleInputChange(e)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description" className="font-weight-600">Description</label>
                                    <textarea name="description" placeholder="description" className="form-control"
                                        id="description" rows="4" style={{ height: "unset" }} required value={productData?.description} onChange={e => handleInputChange(e)}></textarea>
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="category" className="font-weight-600">Category</label>
                                    <input type='text' name="category" placeholder="category" className="form-control"
                                        id="category" required value={productData?.category} onChange={e => handleInputChange(e)} />
                                </div> */}
                                {/* Dropdown category */}
                                <div className="form-group">
                                    <label htmlFor="category" className="font-weight-600">Category</label>
                                    <select className="form-control basic-single pointer" name="category" id="category" value={productData?.category} onChange={e => handleInputChange(e)} required >
                                        <option value=''>Select category</option>
                                        {categories?.map((x, i) => {
                                            return (
                                                <option value={x.name} className='text-capitalize'>{x.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="form-group d-flex flex-column">
                                    <label htmlFor="image" className="font-weight-600" id="colorRed">File<span
                                        id="starRed">*</span></label>
                                    <input type="file" name="image" id="image" className="custom-input-file border-0 mb-3"
                                        data-multiple-caption="{count} files selected" accept="image/*" multiple
                                        required={productState?.image == null ? true : false} onChange={e => setDynamicLabel(e)} />
                                    <label htmlFor="image" id="customLabel" className='customLabel form-control' >
                                        <i className="fa fa-upload"></i>&nbsp;&nbsp;
                                        <span id='dynamicLabel'>Choose a file…</span>
                                    </label>
                                    <div id="imageHolder" >
                                        {title === "Edit product" ? productState?.image?.map(item => {
                                            return (
                                                <div className='displayimg' style={{ backgroundImage: `url(${item})` }}></div>
                                            )
                                        }) : ""}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="discount" className="font-weight-600">Discount</label>
                                    <input type='number' name="discount" placeholder="discount" className="form-control"
                                        id="discount" required value={productData?.discount} onChange={e => handleInputChange(e)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock" className="font-weight-600">In Stock</label>
                                    <input type='number' name="stock" placeholder="stock" className="form-control"
                                        id="stock" required value={productData?.stock} onChange={e => handleInputChange(e)} />
                                </div>

                                {/* this should not be here as admin should not put rrating or reviews,, */}
                                {/* <div className="form-group">
                                        <label htmlFor="rating" className="font-weight-600">Ratings</label>
                                        <input type='number' name="rating" placeholder="rating" className="form-control"
                                            id="rating" required />
                                    </div> */}

                                <button id="go" type='submit' className='btn btn-outline-warning w-100' >
                                    {title}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductForm