import React from "react";
import { useSelector } from "react-redux";
import BagLoader from "../loaders/BagLoader";

const Loader = () => {
  const loaderVisibility = useSelector((state) => state.loader.loader);

  return (
    <>
      {/* in progress loader */}
      {loaderVisibility && (
        // <div className="loader">
        //   <div className="bag-container">
        //     <div style={{ position: "relative" }}>
        //       <div className="bag"></div>
        //       <div className="handle"></div>
        //     </div>
        //   </div>
        //   <section>LOADING...</section>
        // </div>
        <div className="inProgressLoader">
          <BagLoader />
        </div>
      )}
    </>
  );
};

export default Loader;
