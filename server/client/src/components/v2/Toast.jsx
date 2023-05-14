import React from 'react'

const Toast = () => {
 
  const hideToast =()=>{
    console.log('hidetoast')
    //when neeeded to show just add the class to make it visinle and after a few sec set a settiemout to delete the node
    let toastContainer = document.querySelector('.toastContainer')
    toastContainer.classList.add('hideToast')
  }

  return (
    <>
    <div className='toastContainer' onClick={hideToast}>
        the toast
    </div>
    </>
  )
}

export default Toast