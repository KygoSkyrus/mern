import React from 'react'


//NOT IN USE: not incorporated in currrent system
const AddCategory = () => {
    const [category, setCategory] = React.useState()
    const [subCategory, setSubCategory] = React.useState()

    function addcategory() {
        fetch('/api/addcategory', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name:category,
                subCategory:subCategory.split(",")
            }),
        }).then(response => response.json())
            .then(data => {
                 console.log('catgeory respinse',data.data)
                 if(data.data){
                    setCategory("")
                    setSubCategory("")
                 }
            })
    }
  return (
    <>
      <div>
                <input type="text" className="form-control" name="category"
                    placeholder="category" required value={category} onChange={e => setCategory(e.target.value)} />
                <input type="text" className="form-control" name="subCategory"
                    placeholder="subcategory" required value={subCategory} onChange={e => setSubCategory(e.target.value)} />
                <button onClick={e => addcategory(e)}> ADD</button>
            </div>
    </>
  )
}

export default AddCategory