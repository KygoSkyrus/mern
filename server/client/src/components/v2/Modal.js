import React from 'react'
import AddProductForm from './Admin/AddProductForm'

const Modal = ({editProduct}) => {

    if(editProduct) return <AddProductForm/>
else
  return (
    <div className="modal fade" id="editProduct" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">edit</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSignin"></button>
            </div>

            <div className="modal-body">

                <div className="padding" >
                  ytrrt
                </div>

                <div className="padding" >
                    <form >
                        <div className="mb-3">
                        </div>
                        <div id='sign-in-button' className='d-none'>ss</div>
                        {/* <div className="mb-3">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                        </div> */}
                        <div className="position-relative">
                            <div className="p-2 text-center">
                               
                            </div>
                        </div>

                        <button className="btn btn-outline-warning w-100">333</button>
                    </form>
                </div>


            </div>

            <div className="modal-footer">
                <a data-bs-target="#exampleModalToggle2" href="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">New to Shopp-itt? create new account</a>
            </div>
        </div>
    </div>
</div>
  )
}

export default Modal