import React from "react";
import { useRef } from "react";
import { toastVisibility } from "./redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Toast = () => {

  let timer;
  const toastContainer =useRef()
  const dispatch=useDispatch()
  
  const hideToast = () => {
    toastContainer.current.classList.remove("active");
    clearTimeout(timer);
  };

  const showToast = () => {
    toastContainer.current.classList.add("active");
    timer = setTimeout(() => {
      toastContainer.current.classList.remove("active");
      dispatch(toastVisibility({ toast: false }))//setting visibility to flase
    }, 3500);
  };
  
  const isToastVisible= useSelector(state=>state.productFormVisibility.toast)
  const message = useSelector(state=>state.productFormVisibility.toastContent)

  if(isToastVisible){
    showToast()
  }
 
  return (
    <>
      <div className="toastContainer" ref={toastContainer} onClick={hideToast}>
        <section className="toast-inner">{message}</section>
        <span onClick={hideToast}>
          <i className="fa-solid fa-xmark close"></i>
        </span>
      </div>
    </>
  );
};

export default Toast;
