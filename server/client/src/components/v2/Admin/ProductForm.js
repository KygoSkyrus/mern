import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility } from './../redux/todoSlice'


// ADD PRODUCT --------------------------------------
import { v4 as uuidv4 } from 'uuid';
//firebase
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import okayIcon from "./../../../assets/images/okay-icon.png"
// ADD PRODUCT --------------------------------------

const productState={
    name: "xx", url: "xx", price: 2, description: "x", category: "first", image: ["https://webrtc.github.io/samples/img.png","https://webrtc.github.io/samples/iii.jpg"], stock: 0
}

const ProductForm = (props) => {

    const [productData, setProductData] = React.useState({
        //  name: "", url: "", price: 0, description: "", category: "", image: null, stock: 0 
    })
    const [showLoader, setShowLoader] = React.useState(false)


    const dispatch = useDispatch()

    //const productState = useSelector(state => state.productForm.productData)//here the productForm is name of the slice
    const title = useSelector(state => state.productFormVisibility.title)
    // console.log('pddd', productState, title)

    // console.log('--------------c.c.c..c', productData, productState)

    useEffect(() => {
        // console.log('--------------', productData, productState.name)
        setProductData(productState)//setting the inputs to selected product to edit
    }, [])


    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const closeProductContainer = () => {
        dispatch(productFormVisibility({ visibility: false }));
    }



    //FROM ADDPRODUCT
    //-------------------- FIREBASE INITIALIZE -----------------------
    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: "shopp-itt.firebaseapp.com",
        projectId: "shopp-itt",
        storageBucket: "shopp-itt.appspot.com",
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    //-------------------- FIREBASE INITIALIZE -----------------------



    async function sendData(e) {
        e.preventDefault()//this stops page to refresh if the form submission is used with type submit button
        setShowLoader(true)//start showing loader




        console.log('pd', productData, productState)
        //here when editing you need to push the chnage stuff only 

        return;


        let tempArr = [];
        let progressOverlay = document.querySelector('.progressOverlay')
        let progressElem = document.getElementById('progress')
        let imagePreview = document.querySelector('.imagePreview')
        let ok = document.getElementById('ok');
        let imgName = document.querySelector('.imgName')
        Array.from(productData.image).forEach(async (x, index) => {
            console.log(index + ": ", x)
            let imageRef = ref(storage, "shoppitt/" + uuidv4());
            //uploading image to firebase storage

            ok.style.display = "none"
            //u can also add the upload status feature here

            const uploadTask = uploadBytesResumable(imageRef, x);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    console.log('---', snapshot.bytesTransferred, snapshot.totalBytes, snapshot.bytesTransferred / snapshot.totalBytes);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + Math.round(progress) + '% done');


                    //show progress bar
                    progressOverlay.style.display = "grid"

                    progressElem.style.width = Math.round(progress) + "%"
                    imagePreview.style.backgroundImage = `url('${URL.createObjectURL(x)}')`
                    imgName.innerHTML = x.name;

                    if (Math.round(progress) === 100) {
                        ok.style.display = "block"
                        progressOverlay.style.display = "none"
                        progressElem.style.width = "0%"
                    }

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
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                async () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    console.log('111')
                    await getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            tempArr.push(downloadURL)
                            //WORKING HERE::hAS ERROR
                            //from here you need to call the api by wrapping it inside a function and passing the temparr and product data
                            if (index === productData.image.length - 1) addProductAPI(tempArr)
                        });
                    console.log('---------------------------------->>>>>>>>>>>>>>>>>')
                }
            );


        })




        //we should avoid using url,, just use a template to show product and send data when its clicked


    }

    function addProductAPI(image) {
        console.log('productdata----', productData, image)
        console.log('addproduct ran????????????????????????????')
        fetch("/api/addproducts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: productData.name,
                url: productData.url,
                price: productData.price,
                description: productData.description,
                category: productData.category,
                stock: productData.stock,
                image: image,
            }),
        }).then(response => response.json())
            .then(data => {
                console.log('dd', data)
                if (data.is_product_added) {
                    setShowLoader(false)
                    //have to set the state for toast to true ,,this should be in redux store
                    // window.location.reload();
                } else {
                    //resetting the fields
                    setShowLoader(false)
                    //document.getElementById("frm").reset();
                    //setDynamicLabel()
                }
            })
            .catch(err => console.log(err))
    }

    async function deleteBlog(id) {
        setShowLoader(true)
        fetch("/deleteblog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.isDeleted) {
                    setShowLoader(false)
                    window.location.reload()
                }
            })
    }

    function settingUrl(e) {
        let title = e.target.value;
        let str = title.replace(/\s+/g, "-").toLowerCase();
        document.getElementById("url").value = str;
        setProductData({ ...productData, [e.target.name]: e.target.value, url: str })
    }

    function setDynamicLabel(e) {
        //you can write the ogic to create the object url and store it in array state wihich will update the image holder like in edit componnent
        console.log('setdynmaic')
        let imageHolder = document.getElementById('imageHolder')
        imageHolder.innerHTML = "";
        if(title==="Edit product"){
           //re add the exiting image here
           productState.image?.map(x=>{
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
        console.log('SETDYNAM END')
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
                        <div className="text-right">
                            <div className="actions">
                                <span
                                    //  onClick={e => window.location.reload()}
                                    onClick={closeProductContainer}
                                    className="action-item cursor-pointer" >
                                    <i
                                        className="fas fa-times"></i></span>
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
                                        id="description" rows="2" required value={productData?.description} onChange={e => handleInputChange(e)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category" className="font-weight-600">Category</label>
                                    <div className="">
                                        <select className="form-control basic-single" name="category" id="category" value={productData?.category} onChange={e => handleInputChange(e)} required >
                                            {/* <optgroup label="Select Category" id="optgroup">
                                                    {allCategory?.map(x => {
                                                        return (<option value={x.category} key={x._id} >{x.category}</option>)
                                                    })}
                                                </optgroup> */}

                                            <option value=''>Select category</option>
                                            {/* <optgroup label="Select Category" id="optgroup" name="category" > */}
                                            <option value='first'>first</option>
                                            <option value='second'>second</option>
                                            {/* </optgroup> */}
                                        </select>
                                    </div>

                                    {/* <div className="form-group">
                                        <label htmlFor="categoryOption" className="font-weight-600">select</label>
                                        <input name="categoryOption" placeholder="description" className="form-control"
                                            id="categoryOption" required />
                                    </div> */}
                                </div>

                                <div className="form-group d-flex flex-column">
                                    <label htmlFor="image" className="font-weight-600" id="colorRed">File<span
                                        id="starRed">*</span></label>
                                    <input type="file" name="image" id="image" className="custom-input-file border-0 mb-3"
                                        data-multiple-caption="{count} files selected" accept="image/*" multiple
                                        required onChange={e => setDynamicLabel(e)} />
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

                                <button id="go" type='submit' >
                                    {title}
                                </button>
                            </form>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                    </div>
                </div>
            </div>


{/* the loader between process actions */}
            {showLoader &&
                <div className='loader'>
                    <div className='bag-container'>
                        <div style={{ position: "relative" }}>
                            <div className='bag'>
                            </div>
                            <div className='handle'></div>
                        </div>
                    </div>
                        <h2>LOADING...</h2>
                </div>
            }

            {/* image upload progress */}
            <div className='progressOverlay'>
                <div className='d-flex flex-column align-items-center'>
                    <section className='progressBar'>
                        <section id='progress'></section>
                    </section>
                    <div className='imagePreview my-2'>
                        <img id='ok' src={okayIcon} alt="done" />
                    </div>
                    <section className='imgName'></section>
                </div>
            </div>
        </>
    )
}

export default ProductForm