import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

//firebase
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import AddProductForm from './AddProductForm';

import './admin.css'
import Nav from './Admin/Nav';

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



        let tempArr = [];

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
                        tempArr.push(downloadURL)
                        //WORKING HERE::hAS ERROR
                        //from here you need to call the api by wrapping it inside a function and oassing the temparr and product data
                    });
                }
            );


        })

        console.log('productdata----',productData,tempArr)


//we should avoid using url,, just use a template to show product and send data when its clicked

        // fetch("/blogdata", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         tempArr,
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
        <Nav/>
            <div className="body-content m-3">
                <AddProductForm sendData={sendData} settingUrl={settingUrl} productData={productData} setProductData={setProductData} setDynamicLabel={setDynamicLabel} />
            </div>
        </>
    )
}

export default Admin