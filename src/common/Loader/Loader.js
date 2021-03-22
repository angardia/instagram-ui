import React from "react";
import "./Loader.scss";
import LoaderImg from "./spinner_blossom.png";

const Loader = () => {

  return (
    <div className="Loader">
      <h2 className="Loader_Heading" >Your posts are loading</h2>
      <img className="Loader_Image"
        src={LoaderImg}
        alt="logo"
      />
    </div>
  );
};

export default Loader;
