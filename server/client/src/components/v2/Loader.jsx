import React from "react";
import { useSelector } from "react-redux";
import BagLoader from "./BagLoader";

const Loader = () => {
  const loaderVisibility = useSelector(
    (state) => state.productFormVisibility.loader
  );

  return (
    <>
      {/* the loader between process actions */}
      {!loaderVisibility && (
        // <div className="loader">
        //   <div className="bag-container">
        //     <div style={{ position: "relative" }}>
        //       <div className="bag"></div>
        //       <div className="handle"></div>
        //     </div>
        //   </div>
        //   <section>LOADING...</section>
        // </div>
        <div style={{position: "absolute",top: 0,width: "100vw",height: "100vh",background:"#303030a8", zIndex: 4}}> 
          <BagLoader/>
        </div>
      )}
    </>
  );
};

export default Loader;
