import { Typography, alertTitleClasses, private_excludeVariablesFromRoot } from "@mui/material";
import useOneproduct from "../Hooks/oneproduct";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { variantstate } from "../store/atoms/variants";
import { imagestate } from "../store/atoms/images";
import { Sizestate } from "../store/atoms/Sizes";
import Variants from "./Variants";
import Sizes from "./Sizes";
import { useEffect, useState } from "react";
import axios from "axios";
import Images from "./images";
import { Navigate } from "react-router-dom";

export default function Productedit() {
  const [sellingPrice, setsellingprice] = useState(0);
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

  const { productId } = useParams();
  console.log(productId);
  const Data = useOneproduct(productId);
  console.log(`the data ${JSON.stringify(Data)}`);

  useEffect(() => {
    if (Data && Data.sizes) {
      setvariant(Data?.variants);
      setimages(Data?.images);
      setsize(Data?.sizes);
      //setprod(Data)
      setprod({
        name: Data.name,
        description: Data.description,
        price: Data.price,
        discount: Data.discount,
        color: Data.color,
        code: Data.code,
        type: Data.type,
      });
    }
  }, [Data]);

  if (!Data) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "100vw",
        background: "gray",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <div
        className="imgdiv"
        style={{
          width: "50vw",
          display: "flex",
          background: "red",
          flexFlow: "wrap",
        }}
      >
        <Imageshow Data={Data} />
      </div>
      <div id="formfordata" style={{ width: "46%" }}>
        <Form
          images={images}
          setimages={setimages}
          variant={variant}
          setvariant={setvariant}
          sellingPrice={sellingPrice}
          setsellingprice={setsellingprice}
          size={size}
          setsize={setsize}
          prod={prod}
          setprod={setprod}
          productId={productId}
        ></Form>
      </div>
    </div>
  );
}

function Imageshow(props) {
  // //const imgs = Array.isArray(props.Data.images) && props.Data.length > 0 ? props.Data.images[0] || []
  //   : [];
  const imgs = props.Data?.images;
  return (
    imgs && (
      <>
        {imgs.map((image) => {
          return (
            <div style={{ width: "46%" }}>
              <img src={image} alt={image} />
            </div>
          );
        })}
      </>
    )
  );
}

function Form(props) {
    const navigate = useNavigate();

  const {
    images,
    setimages,
    variant,
    setvariant,
    sellingPrice,
    setsellingprice,
    size,
    setsize,
    prod,
    setprod,
    productId,
  } = props;
  function isformvalid() {
    // const img = images.every((str) => str.trim() !== "");

    // const siz = size.every((jsonObject) => {
    //   return Object.keys(jsonObject).every(
    //     (key) => jsonObject[key].trim() !== ""
    //   );
    // });

    // const pro = Object.keys(prod).every((key) => prod[key].trim() !== "");
    // return img && siz && pro; 
    return true ; 
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
    
      //http://localhost:3000/admin/patch/6585aee9bb882ad349b0f400
      try {
        const response = await axios.patch(
          `http://localhost:3000/admin/patch/${productId}`,
          DATA,
          {
            headers: {
              authorization: `BEARER ${jwt}`,
            },
          }
        );
        console.log("response :", response.data);
        window.alert('changes saved sucessfully ' , JSON.stringify(response.data))
      } catch (error) {
        console.log("Error:", error.message);
        window.alert('UNABLE to update ' ,error.message)
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
  async function deleteproduct(){
///http://localhost:3000/admin/delete/6585ae3850675dfca388da80
const jwt = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `http://localhost:3000/admin/delete/${productId}`,
          {
            headers: {
              authorization: `BEARER ${jwt}`,
            },
          }
        );
        console.log("response :", response.data);
        window.alert(response.data)
        navigate('/admin');
        
      } catch (error) {
        console.log("Error:", error.message);
        window.alert("Error:", error.message)
      }
  }




  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div>
        <h1> EDIT PRODUCT {productId}</h1>
        
            <label htmlFor="name">Product ID: {productId}</label>
        <br />
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handlechange}
          value={prod.name}
        />
        <br />
        <label htmlFor="name">Product Type :</label>
        <input
          type="text"
          id="name"
          name="type"
          onChange={handlechange}
          value={prod.type}
        />
        <br />
        <label htmlFor="description">Product Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          onChange={handlechange}
          value={prod.description}
        />
        <br />
        <label htmlFor="price">Product Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={handlechange}
          value={prod.price}
        />
        <br />
        <label htmlFor="discount">Product Discount:</label>
        <input
          type="number"
          id="discount"
          name="discount"
          onChange={handlechange}
          value={prod.discount}
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
        <input
          type="text"
          id="color"
          name="color"
          onChange={handlechange}
          value={prod.color}
        />
        <br />
        <label htmlFor="code">Product colour code:</label>
        <input
          type="text"
          id="code"
          name="code"
          onChange={handlechange}
          value={prod.code}
        />
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
        <button onClick={deleteproduct} style={{margin: '10px', color:'white', backgroundColor:'red' }}>DELETE PRODUCT </button>
        <button type="button" onClick={handleclick} disabled={!isformvalid()} style={{backgroundColor:'green', color:'white'}}>
          UPDATE
        </button>
      </div>
    </div>
  );
}
