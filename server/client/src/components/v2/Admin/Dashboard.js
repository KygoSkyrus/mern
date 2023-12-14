/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Nav from './Nav'
import Header from './Header'
import Product from './ProductList'
import BagLoader from '../loaders/BagLoader'

import { findSubString } from '../Utility'
import { isProductUpdated } from '../redux/productSlice'

let allProducts;
const Dashboard = () => {

    const dispatch = useDispatch()
    const [searchedQuery, setSearchedQuery] = useState()
    const [products, setProducts] = useState(false) //to set products fetched from server
    const isUpdated = useSelector(state => state.product.isProductUpdated)

    useEffect(() => {
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
                            <table className="table table-hover">
                                <thead className="border-bottom bg-body">
                                    <tr>
                                        <th scope="col" width="50"></th>
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
                                    {products?.map((x, i) => {
                                        return (
                                            <Product details={x} key={i} areLastTwoRow={i >= products?.length - 2} />
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
        </>
    )

}
export default Dashboard