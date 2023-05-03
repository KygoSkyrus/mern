import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

//firebase
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";



const Admin = () => {

    const [showLoader, setShowLoader] = useState(false)
    const [productData, setProductData] = useState({ name: "", url: "", price: 0, description: "", category: "", image: "", stock: 0 })


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
        console.log('eeee', productData)


        // let image = document.getElementById("image")?.files[0];
        // let title = document.getElementById("title")?.value;
        // let url = document.getElementById("url")?.value;
        // let category = document.getElementById("category")?.value;
        // let select
        // if (document.querySelector("input[type=radio][name=select]:checked")) {
        //     select = document.querySelector("input[type=radio][name=select]:checked")?.value;
        // } else {
        //     select = ''
        // }
        // let shortdesc = document.getElementById("shortdesc")?.value;
        // let author = document.getElementById("author")?.value;
        // let metatitle = document.getElementById("metatitle")?.value;
        // let metakeyword = document.getElementById("metakeyword")?.value;
        // let metadesc = document.getElementById("metadesc")?.value;



        let imageUrl = [];

        Array.from(productData.image).forEach(async x => {
            let imageRef = ref(storage, "shoppitt/" + uuidv4());
            //uploading image to firebase storage

            console.log('x', x)
            //u can also add the upload status feature here



            const uploadTask = uploadBytesResumable(imageRef, x);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
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
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );


        })

        console.log(imageUrl)



        // fetch("/blogdata", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         imageUrl,
        //         title,
        //         url,
        //         category,
        //         select,
        //         shortdesc,
        //         author,
        //         metatitle,
        //         metakeyword,
        //         metadesc,
        //     }),
        // }).then(response => response.json())
        //     .then(data => {
        //         if (data.blog_added) {
        //             setShowLoader(false)
        //             window.location.reload();
        //         } else {
        //             //resetting the fields
        //             setShowLoader(false)
        //             document.getElementById("frm").reset();
        //             setDynamicLabel()
        //         }
        //     })
        //     .catch(err => console.log(err))
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

    return (
        <>
            <div className="body-content m-3">
                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0">Post a Blog</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <span onClick={e => window.location.reload()} className="action-item cursor-pointer" >
                                        <i
                                            className="fas fa-refresh"></i></span>
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
                                            autoComplete="off" placeholder="product name" onChange={e => settingUrl(e)} required />
                                    </div>
                                    <div className="form-group">
                                        {/* <label htmlFor="url" className="font-weight-600">Product Url</label> */}
                                        <input type="hidden" className="form-control" name="url" id="url"
                                            autoComplete="off" placeholder="Product URL" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price" className="font-weight-600">Price</label>
                                        <input type='number' name="price" placeholder="price" className="form-control"
                                            id="price" required value={productData.price} onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description" className="font-weight-600">Description</label>
                                        <textarea name="description" placeholder="description" className="form-control"
                                            id="description" rows="2" required onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="category" className="font-weight-600">Category</label>
                                        <div className="">
                                            <select className="form-control basic-single" name="category" id="category" onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })} >
                                                {/* <optgroup label="Select Category" id="optgroup">
                                                    {allCategory?.map(x => {
                                                        return (<option value={x.category} key={x._id} >{x.category}</option>)
                                                    })}
                                                </optgroup> */}
                                                <optgroup label="Select Category" id="optgroup" name="category" >
                                                    <option value='first' >first</option>
                                                    <option value='second' >second</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="categoryOption" className="font-weight-600">select</label>
                                            <input name="categoryOption" placeholder="description" className="form-control"
                                                id="categoryOption" required />
                                        </div>
                                    </div>

                                    <div className="form-group d-flex flex-column">
                                        <label htmlFor="image" className="font-weight-600" id="colorRed">File<span
                                            id="starRed">*</span></label>
                                        <input type="file" name="image" id="image" className="custom-input-file border-0"
                                            data-multiple-caption="{count} files selected" accept="image/*" multiple
                                            required onChange={e => setDynamicLabel(e)} />
                                        <label htmlFor="image" id="customLabel" className='customLabel form-control' >
                                            <i className="fa fa-upload"></i>&nbsp;&nbsp;
                                            <span id='dynamicLabel'>Choose a file…</span>
                                        </label>
                                        <div id="imageHolder" className='d-flex flex-wrap'></div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="stock" className="font-weight-600">In Stock</label>
                                        <input type='number' name="stock" placeholder="stock" className="form-control"
                                            id="stock" required onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })} />
                                    </div>

                                    {/* this should not be here as admin should not put rrating or reviews,, */}
                                    {/* <div className="form-group">
                                        <label htmlFor="rating" className="font-weight-600">Ratings</label>
                                        <input type='number' name="rating" placeholder="rating" className="form-control"
                                            id="rating" required />
                                    </div> */}

                                    <button id="go" type='submit' >
                                        Add product
                                    </button>
                                </form>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin