import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

//firebase
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import AddProductForm from './AddProductForm';
import okayIcon from "./../../../assets/images/okay-icon.png"


const AddProduct = (props) => {


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
                <AddProductForm sendData={sendData} settingUrl={settingUrl} productData={productData} setProductData={setProductData} setDynamicLabel={setDynamicLabel} />
            </div>
        </>


    )
}

export default AddProduct