import React, { useState } from "react";
import Data from "../../data/productGalleryData";
import images from "../../data/images";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { useNavigate } from "react-router-dom";

function ProductGallery() {
  const [show, setShow] = useState(false);
  const [div, setDiv] = useState("");
  const navigate = useNavigate();
  return (
    <div className="product_gallery">
      <div className="invent_menu">
        <div>
          <button onClick={() => navigate(-1)}>
            <ArrowCircleLeftIcon /> BACK
          </button>
        </div>
      </div>
      <div className="gallery_heading">
        <div className="gallery_logo">
          <img src={images.logo} alt="" />
        </div>
        <h1>Product Gallery</h1>
        <h5>List of available drug brands</h5>
      </div>
      <div className="gallery_products">
        {Data.map((drugClass, i) => (
          <div className="drug_class">
            <div className="drug_class_heading">
              <h3>{drugClass.classOfDrug}</h3>
              <div className="show_list">
                {div === i && show ? (
                  <KeyboardArrowDownIcon
                    onClick={() => {
                      document.getElementById(i).style.display = "none";
                      setDiv(i);
                      setShow(!show);
                    }}
                  />
                ) : (
                  <KeyboardArrowRightIcon
                    onClick={() => {
                      document.getElementById(i).style.display = "block";
                      setDiv(i);
                      setShow(!show);
                    }}
                  />
                )}
              </div>
            </div>
            <div id={i} style={{ display: "none" }}>
              {drugClass.drugs.map((drug, i) => (
                <ul className="drug">
                  <h5>{drug.drug}</h5>
                  <ul className="brands">
                    {drug.brands.map((brand, i) => (
                      <li>{brand}</li>
                    ))}
                  </ul>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
