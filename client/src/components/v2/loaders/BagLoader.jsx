import React from "react";
import theBagLogo from "./../../../assets/images/thebaglogo.png";

const BagLoader = () => {
  return (
    <>
      <div className="loader_container">
        <div className="d-flex flex-column align-items-center">
          <img src={theBagLogo} alt="shoppitt" height="30px" />
          <div className="line mt-2">
            <section className="mover"></section>
          </div>
        </div>
      </div>
    </>
  );
};

export default BagLoader;
