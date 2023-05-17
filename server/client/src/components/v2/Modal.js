import React from 'react'
import AddProductForm from './Admin/AddProductForm'

const Modal = ({product}) => {

console.log('xxx',product)
    return (
        <div className="modal fade" id="editProduct" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Edit product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSignin"></button>
                    </div>

                    <div className="modal-body">
                    <AddProductForm  />
                    </div>

                    {/* <div className="modal-footer">
                        <a data-bs-target="#exampleModalToggle2" href="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">New to Shopp-itt? create new account</a>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Modal