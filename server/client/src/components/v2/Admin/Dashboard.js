import React,{useEffect, useState} from 'react'
import  Modal  from './../Modal'

const Dashboard = () => {

    const [products,setProducts]=useState()

    useEffect(()=>{
        console.log('ue in hp')
            fetch('/api/getproducts',{
              method:"GET",
              headers: { "Content-Type": "application/json" },        
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('products',data)
            setProducts(data)
        })
      },[])

  return (
   <>
<div className="body-content m-3">
<Modal/>
   {products?
   
   products.map(x=>{
    return (
        <div className='m-2 bg-dark text-light p-2'>
            <section>name - {x.name}</section>
            <section data-bs-toggle="modal" href="#editProduct" role="button" >edit</section>
            {/* {x.image.map(img=>(<img src={img} alt={x.name} width='300px' />))} */}
        </div>
    )
   })


:<div></div>
}
</div>

   </>
  )

}
export default Dashboard