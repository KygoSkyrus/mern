import React from "react";
import { useRef } from "react";
import { toastVisibility,setToastContent } from "./redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Toast = () => {
  let timer;
  const toastContainer = useRef();
  const dispatch = useDispatch();

  const hideToast = () => {
    toastContainer.current.classList.remove("active");
    clearTimeout(timer);
  };

  const showToast = () => {
    toastContainer.current.classList.add("active");
    timer = setTimeout(() => {
      toastContainer.current.classList.remove("active");
      dispatch(toastVisibility({ toast: false })); //setting visibility to flase
      dispatch(setToastContent({ message: "" }))//and content empty
    }, 3500);
  };

  const isToastVisible = useSelector(
    (state) => state.productFormVisibility.toast
  );
  const isSuccess = useSelector(
    (state) => state.productFormVisibility.isSuccess
  );
  const message = useSelector(
    (state) => state.productFormVisibility.toastContent
  );

  if (isToastVisible) {
    showToast();
  }

  return (
    <>
      <div
        className="toastContainer"
        ref={toastContainer}
        onClick={hideToast}
        style={{
          borderLeft: isSuccess
            ? "6px solid var(--color-green)"
            : "6px solid var(--color-red)",
        }}
      >
        {isSuccess ? (
          <span>
            <i className="fa-solid fa-circle-check me-3"></i>
          </span>
        ) : (
          <span>
            <i className="fa-solid fa-triangle-exclamation me-3"></i>
          </span>
        )}

        <section className="toast-inner">{message}</section>
        <span onClick={hideToast}>
          <i className="fa-solid fa-xmark close ms-5"></i>
        </span>
      </div>
    </>
  );
};

export default Toast;
