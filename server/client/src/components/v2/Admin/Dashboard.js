import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productFormVisibility, setProductForm } from './../redux/todoSlice'

// ADD PRODUCT --------------------------------------
import { v4 as uuidv4 } from 'uuid';
//firebase
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import ProductForm from './ProductForm';
import okayIcon from "./../../../assets/images/okay-icon.png"
// ADD PRODUCT --------------------------------------



import Modal from './../Modal'
import AddProduct from './AddProduct'

const Dashboard = () => {

    const [products, setProducts] = useState()
    const [selectedProduct, setSelectedProduct] = useState(null);

    const visibility = useSelector(state => state.productFormVisibility.visibility)



    // ADD PRODUCT --------------------------------------
    const [showLoader, setShowLoader] = useState(false)
    const [productData, setProductData] = useState({ name: "", url: "", price: 0, description: "", category: "", image: null, stock: 0 })


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
        console.log('pd', productData)
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
                            //from here you need to call the api by wrapping it inside a function and oassing the temparr and product data
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
        let imageHolder = document.getElementById('imageHolder')
        imageHolder.innerHTML = "";
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
            setProductData({ ...productData, [e.target.name]: e.target.files })
        } else {
            document.getElementById("dynamicLabel").innerHTML = "Choose a file…"
        }
    }
    // ADD PRODUCT--------------------------------------











    const dispatch = useDispatch()
    const handleCardClick = (product) => {
        //setSelectedProduct(product);//setting the current selected product
        dispatch(setProductForm(product))
        //note:update the redux here instead of setting state...and wherever this state is used,,get the state from store
        //setDisplayProductForm(true)//showing the product form
        dispatch(productFormVisibility({ visibility: !visibility }));

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
                                    <th scope="col" class="small fw-normal">Title</th>
                                    <th scope="col" class="small fw-normal">Last Updated</th>
                                    <th scope="col" class="small fw-normal">Due Date</th>
                                    <th scope="col" class="small fw-normal">Members</th>
                                    <th scope="col" class="small fw-normal">Status</th>
                                    <th scope="col" class="small fw-normal text-end">Progress</th>
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

                                                    {/* <!-- Input Search --> */}
                                                    <div class="">
                                                        <input type="email" class="form-control rounded-top rounded-3 border-0 " placeholder="Search..." />
                                                    </div>

                                                    {/* <!-- START Header --> */}
                                                    <div class="px-3 py-2 d-flex align-items-center bg-light small border-top">
                                                        <small> Apply people for this task</small>
                                                    </div>
                                                    {/* <!-- END Header --> */}

                                                    {/* <!-- START List --> */}
                                                    <ul class="overflow-auto list-unstyled mb-0 vstack" style={{ height: "200px", gap: "1px" }}>
                                                        <li>
                                                            <a class="dropdown-item d-flex py-2" href="#" data-bs-toggle="button">
                                                                <div class="avatar-sm rounded-pill bg-secondary small text-white d-flex align-items-center justify-content-center text-wrap small me-3">
                                                                    <small>UY</small>
                                                                </div>
                                                                <span class="flex-grow-1 align-self-center me-5">Ugo Yanaroseh</span>
                                                            </a>
                                                        </li>
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
                                                        <li>
                                                            <a class="dropdown-item active d-flex py-2" href="#" data-bs-toggle="button">
                                                                <div class="avatar-sm rounded-pill bg-secondary small text-white d-flex align-items-center justify-content-center text-wrap small me-3">
                                                                    <small>UY</small>
                                                                </div>
                                                                <span class="flex-grow-1 align-self-center me-5">Ugo Yanaroseh</span>
                                                                <i class="fas fa-check small align-self-center"></i>
                                                            </a>
                                                        </li>
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
                    : <div></div>
                }
            </div>

            {visibility && <Modal
                product={selectedProduct}
                title="Edit product"
            />}



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

            <div className="body-content m-3">
                {/* {should move all these function to the productform compoennnet} */}
                <ProductForm sendDat
                a={sendData} settingUrl={settingUrl} productData={productData} setProductData={setProductData} setDynamicLabel={setDynamicLabel} title="Add product" />
            </div>


        </>
    )

}
export default Dashboard