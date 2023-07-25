import React from "react";
import { useRef } from "react";
import { toastVisibility } from "./redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Toast = () => {


  const toastContainer =useRef()
  let timer;

 const dispatch=useDispatch()
  
  const hideToast = () => {
    toastContainer.current.classList.remove("active");
    clearTimeout(timer);
  };

  const showToast = () => {
    toastContainer.current.classList.add("active");

    timer = setTimeout(() => {
      toastContainer.current.classList.remove("active");
      dispatch(toastVisibility({ toastVisibility: false }))//setting visibility to flase
    }, 5000);
  };
  
  const isToastVisible= useSelector(state=>state.productFormVisibility.toast)

  if(isToastVisible){
    showToast()
  }
 
  return (
    <>
      <div className="toastContainer" ref={toastContainer} onClick={hideToast}>
        <section className="toast-inner">the toast</section>

        <span onClick={hideToast}>
          <i className="fa-solid fa-xmark close"></i>
        </span>
      </div>
    </>
  );
};

export default Toast;
