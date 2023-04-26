import React,{useState} from 'react'

const Admin = () => {

    const [showLoader, setShowLoader] = useState(false)


    async function sendData(e) {
        e.preventDefault()//this stops page to refresh if the form submission is used with type submit button
        setShowLoader(true)//start showing loader

        let image = document.getElementById("image")?.files[0];
        let title = document.getElementById("title")?.value;
        let url = document.getElementById("url")?.value;
        let category = document.getElementById("category")?.value;
        let select
        if (document.querySelector("input[type=radio][name=select]:checked")) {
            select = document.querySelector("input[type=radio][name=select]:checked")?.value;
        } else {
            select = ''
        }
        let shortdesc = document.getElementById("shortdesc")?.value;
        let author = document.getElementById("author")?.value;
        let metatitle = document.getElementById("metatitle")?.value;
        let metakeyword = document.getElementById("metakeyword")?.value;
        let metadesc = document.getElementById("metadesc")?.value;
        //let detail = document.querySelectorAll(".note-editable")[0]?.innerHTML; //summernote
        let detail = editorContent

        /*
        let allimg = document.querySelectorAll(".note-editable")[0]?.getElementsByTagName('img');
        //check sthe size of the images inside the summernote
        let totalsize = 0;
        for (let i = 0; i < allimg.length; i++) {
            let base64String = allimg[i].getAttribute("src");//base64 data
            let stringLength = base64String.length - 'data:image/png;base64,'.length;
            let sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            let sizeInKb = sizeInBytes / 1000000;
            totalsize += sizeInKb;
        }
        */

        let imageUrl;
        const imageRef = ref(storage, "skyblog/" + uuidv4());
        //uploading image to firebase storage
        await uploadBytes(imageRef, image)
            .then(snapshot => {
                return snapshot.metadata.fullPath;
            })
            .catch(error => {
                console.log(error)
            });

        //getting the image url
        await getDownloadURL(imageRef)
            .then(url => {
                imageUrl = url;
            })
            .catch(error => {
                console.log(error)
            });

        fetch("/blogdata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageUrl,
                title,
                url,
                category,
                select,
                shortdesc,
                author,
                metatitle,
                metakeyword,
                metadesc,
                detail
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.blog_added) {
                    setShowLoader(false)
                    window.location.reload();
                } else {
                    //resetting the fields
                    setShowLoader(false)
                    document.getElementById("frm").reset();
                    setDynamicLabel()
                }
            })
            .catch(err => console.log(err))
    }


  return (
    <div>Admin</div>
  )
}

export default Admin