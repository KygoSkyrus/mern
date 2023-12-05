import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from './ProductList'
import Nav from './Nav'
import Header from './Header'
import BagLoader from './../BagLoader'

import { isProductUpdated } from '../redux/productSlice'
import { findSubString } from '../Utility'

let allProducts;
const Dashboard = () => {

    const dispatch = useDispatch()
    const [searchedQuery, setSearchedQuery] = useState()
    const [products, setProducts] = useState(false) //to set products fetched from server
    const isUpdated = useSelector(state => state.product.product)

    useEffect(() => {
        console.log('ue in hp')
        fetch('/api/getproducts', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data)//save this data in redux
                allProducts = data;
                dispatch(isProductUpdated({ updateProduct: false }))//setting to false after reloading the product list
            })
    }, [isUpdated])

    useEffect(() => {
        let searchedProd = allProducts?.filter(x => {
            return (
                findSubString(x.name, searchedQuery) ||
                findSubString(x.category, searchedQuery)
            )
        })
        setProducts(searchedProd)
    }, [searchedQuery])

    return (
        <>
            <Nav />

            <div >
                <Header heading="Products" icon="fa-shopping-bag" setSearchedQuery={setSearchedQuery} />
                {/* <Filters/> */}

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
                                    {products?.map((x,i)=> {
                                        return (
                                            <Product details={x} key={i} />
                                        )
                                    })}
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