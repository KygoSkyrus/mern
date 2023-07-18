import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProductForm,getProductData } from './../redux/todoSlice'

const ProductForm = (props) => {
    const { sendData, settingUrl,
        // productData ,
        setProductData,
        setDynamicLabel, title } = props;


    // const productData = useSelector(state => state.setProductForm)
    const productData = useSelector(state => state.setProductForm)
    console.log('pddd', productData)

    return (
        <>
            <div className="card productForm">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="fs-17 font-weight-600 mb-0">{title}</h6>
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
                                        value={productData?.name} autoComplete="off" placeholder="product name" onChange={e => settingUrl(e)} required />
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="url" className="font-weight-600">Product Url</label> */}
                                    <input type="hidden" className="form-control" name="url" id="url"
                                        autoComplete="off" placeholder="Product URL" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price" className="font-weight-600">Price</label>
                                    <input type='number' name="price" placeholder="price" className="form-control"
                                        id="price" required value={productData?.price} onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description" className="font-weight-600">Description</label>
                                    <textarea name="description" placeholder="description" className="form-control"
                                        id="description" rows="2" required value={productData?.description} onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category" className="font-weight-600">Category</label>
                                    <div className="">
                                        <select className="form-control basic-single" name="category" id="category" value={productData?.category} onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })} required >
                                            {/* <optgroup label="Select Category" id="optgroup">
                                                    {allCategory?.map(x => {
                                                        return (<option value={x.category} key={x._id} >{x.category}</option>)
                                                    })}
                                                </optgroup> */}

                                            <option value=''>Select category</option>
                                            {/* <optgroup label="Select Category" id="optgroup" name="category" > */}
                                            <option value='first'>first</option>
                                            <option value='second'>second</option>
                                            {/* </optgroup> */}
                                        </select>
                                    </div>

                                    {/* <div className="form-group">
                                        <label htmlFor="categoryOption" className="font-weight-600">select</label>
                                        <input name="categoryOption" placeholder="description" className="form-control"
                                            id="categoryOption" required />
                                    </div> */}
                                </div>

                                <div className="form-group d-flex flex-column">
                                    <label htmlFor="image" className="font-weight-600" id="colorRed">File<span
                                        id="starRed">*</span></label>
                                    <input type="file" name="image" id="image" className="custom-input-file border-0 mb-3"
                                        data-multiple-caption="{count} files selected" accept="image/*" multiple
                                        required onChange={e => setDynamicLabel(e)} />
                                    <label htmlFor="image" id="customLabel" className='customLabel form-control' >
                                        <i className="fa fa-upload"></i>&nbsp;&nbsp;
                                        <span id='dynamicLabel'>Choose a file…</span>
                                    </label>
                                    <div id="imageHolder" >
                                        {title === "Edit product" ? productData?.image?.map(item => {
                                            return (
                                                <div className='displayimg' style={{ backgroundImage: `url(${item})` }}></div>
                                            )
                                        }) : ""}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock" className="font-weight-600">In Stock</label>
                                    <input type='number' name="stock" placeholder="stock" className="form-control"
                                        id="stock" required value={productData?.stock} onChange={e => setProductData({ ...productData, [e.target.name]: e.target.value })} />
                                </div>

                                {/* this should not be here as admin should not put rrating or reviews,, */}
                                {/* <div className="form-group">
                                        <label htmlFor="rating" className="font-weight-600">Ratings</label>
                                        <input type='number' name="rating" placeholder="rating" className="form-control"
                                            id="rating" required />
                                    </div> */}

                                <button id="go" type='submit' >
                                    Add
                                </button>
                            </form>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductForm