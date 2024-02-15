import { useRecoilState } from "recoil";
import Sizes from "./Sizes";
import Images from "./images";
import "./input.css";
import { imagestate } from "../store/atoms/images";
import { Sizestate } from "../store/atoms/Sizes";
import { useEffect, useState } from "react";
import Variants from "./Variants";
import { variantstate } from "../store/atoms/variants";
import axios from "axios";


export default function Addproduct() {
  

const [variant, setvariant] = useRecoilState(variantstate);
const [images, setimages] = useRecoilState(imagestate);
const [size, setsize] = useRecoilState(Sizestate);

  const [prod, setprod] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    color: "",
    code: "",
    type: "",
  });
  const [sellingPrice, setsellingprice] = useState(0);


  

  function isformvalid() {
    const img = images?.every((str) => str.trim() !== "");
    // const vari = variant.every((str) => str.trim() !== "");
    const siz = size?.every((jsonObject) => {
      return Object.keys(jsonObject).every(
        (key) => jsonObject[key].trim() !== ""
      );
    });
    const pro = Object.keys(prod)?.every((key) => prod[key].trim() !== "");
    return img && siz && pro; //&& vari ;
  }

  async function handleclick(e) {
    e.preventDefault();
    console.log(`the provided image links are ${images} `);
    console.log(`the provided sizes  are ${JSON.stringify(size)} `);
    console.log(`the prod is ${JSON.stringify(prod)}`);
    const x = [];
    if (isformvalid()) {
      console.log(`the variant thing is `, variant);
      if (variant.length === 1 && variant[0] === "") {
        setvariant((pre) => {
          return [];
        });
        console.log(`variant is set to []  ==> ${variant}`);
      }
      //const v = variant ;
      const DATA = { ...prod, images: images, sizes: size, variants: variant };
      console.log(DATA);
      const jwt = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:3000/admin/newproduct",
          DATA,
          {
            headers: {
              authorization: `BEARER ${jwt}`,
            },
          }
        );
        console.log("response :", response.data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    }

  }

  function handlechange(e) {
    const { name, value } = e.target;
    setprod((prevProd) => ({
      ...prevProd,
      [name]: value,
    }));

    const p = document.getElementById("price").value;
    const d = document.getElementById("discount").value;
    const sp = p - p * (d / 100);
    setsellingprice(sp);
  }

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div>
        <h1> ADD NEW PRODUCT </h1>
        
          <label htmlFor="name">Product Name:</label>
          <input type="text" id="name" name="name" onChange={handlechange} />
          <br />
          <label htmlFor="name">Product Type :</label>
          <input type="text" id="name" name="type" onChange={handlechange} />
          <br />
          <label htmlFor="description">Product Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            onChange={handlechange}
          />
          <br />
          <label htmlFor="price">Product Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handlechange}
          />
          <br />
          <label htmlFor="discount">Product Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            onChange={handlechange}
          />
          <br />
          <label htmlFor="sellingPrice">Selling Price:</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            readOnly
            value={sellingPrice}
          />
          <br />
          <label htmlFor="color">Product Color:</label>
          <input type="text" id="color" name="color" onChange={handlechange} />
          <br />
          <label htmlFor="code">Product colour code:</label>
          <input type="text" id="code" name="code" onChange={handlechange} />
          <br />

          <label htmlFor="sizes">Available Sizes:</label>
          <Sizes />
          <br />
          <label htmlFor="images">Product Images:</label>
          <Images />
          <br />
          <label htmlFor="variants">Variants :</label>
          <Variants />
          <br />
          <button type="button" onClick={handleclick} disabled={!isformvalid()}>
            submit
          </button>
        
      </div>
    </div>
  );
}
