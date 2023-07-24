//firebase
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

let tempArr = [];
let progressOverlay = document.querySelector('.progressOverlay')
let progressElem = document.getElementById('progress')
let imagePreview = document.querySelector('.imagePreview')
let ok = document.getElementById('ok');
let imgName = document.querySelector('.imgName')
Array.from('image list from input').forEach(async (x, index) => {
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

