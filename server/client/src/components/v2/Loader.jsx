import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const loaderVisibility = useSelector(
    (state) => state.productFormVisibility.loader
  );

  return (
    <>
      {/* the loader between process actions */}
      {loaderVisibility && (
        <div className="loader">
          <div className="bag-container">
            <div style={{ position: "relative" }}>
              <div className="bag"></div>
              <div className="handle"></div>
            </div>
          </div>
          <section>LOADING...</section>
        </div>
      )}
    </>
  );
};

export default Loader;
