import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isProductUpdated } from './../redux/todoSlice'


import Modal from './../Modal'
import Product from './ProductList'
import Nav from './Nav'
import BagLoader from './../BagLoader'
import Loader from '../Loader'
import Filters from './Filters'
import Header from './Header'
const Dashboard = () => {

    const dispatch = useDispatch()
    const [products, setProducts] = useState(false) //to set products fetched from server
    const visibility = useSelector(state => state.productFormVisibility.visibility)// modal's visibility 
    const isUpdated = useSelector(state => state.isUpdated.product)

    useEffect(() => {
        console.log('ue in hp')
        fetch('/api/getproducts', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                console.log('products', data)
                setProducts(data)//save this data in redux
                dispatch(isProductUpdated({ updateProduct: false }))//setting to false after reloading the product list
            })
    }, [isUpdated])


    return (
        <>
            <Nav />

            <div >
                <Header heading="Products" icon="fa-shopping-bag" />

                {products ?
                    <div className="container-fluid px-0 admin-table-grid">
                        <div className="table-responsive-md">
                            <table className="table table-hover mt-2">
                                <thead className="border-bottom">
                                    <tr>
                                        <th scope="col" width="50"></th>
                                        {/* <th scope="col" width="30"></th> */}
                                        <th scope="col" className="small fw-normal">Product</th>
                                        <th scope="col" className="small fw-normal">Category</th>
                                        <th scope="col" className="small fw-normal">Price</th>
                                        <th scope="col" className="small fw-normal">Images</th>
                                        <th scope="col" className="small fw-normal">Discount(%)</th>
                                        <th scope="col" className="small fw-normal">In stock</th>
                                        <th scope="col" className="small fw-normal text-end">Rating</th>
                                        <th scope="col" className="small fw-normal text-center">Visibility</th>
                                        <th scope="col" className="small fw-normal"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map(x => {
                                        return (
                                            <Product details={x} key={x._id} />
                                        )
                                    }) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div style={{ height: "calc(100vh - 63px)" }}>
                        <BagLoader />
                    </div>
                }

            </div>

            {/* {visibility && <Modal />} */}

            {/* <Loader/> */}

        </>
    )

}
export default Dashboard