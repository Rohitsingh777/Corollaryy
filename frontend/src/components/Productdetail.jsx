import { Typography } from "@mui/material";
import useOneproduct from "../Hooks/oneproduct";
import { useParams } from "react-router-dom";

export default function Productdetails() {
  const { productId } = useParams();
  console.log(productId);
  const Data = useOneproduct(productId);

  console.log(`the data ${JSON.stringify(Data)}`);
  //const imgs = Data.variants[0]?.images || [];

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
        <Images Data={Data} />
      </div>
      <div id="formfordata" style={{ width: "46%" }}>
        <Form Data={Data} />
      </div>
    </div>
  );
}

function Images(props) {
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
  function enableform() {
    console.log("enablefrom ");
  }

  // const Formdata  = Array.isArray(props.Data.variants) && props.Data.variants.length > 0 ? props.Data.variants[0]?.color || '': '';
  // console.log(Formdata)

  // const imgs = Array.isArray(props.Data.variants) && props.Data.variants.length > 0 ? props.Data.variants[0]?.images || []
  //   : [];

  //   const sizes  = Array.isArray(props.Data.variants) && props.Data.variants.length > 0 ? props.Data.variants[0]?.sizes || []
  //   : [];

  //const color = props.Data.variants[0]?.color || [];

  const sizes = props.Data?.sizes;
  const imgs = props.Data?.images;
  const color = props.Data?.color;

  if (!props.Data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={props.Data.name}
          disabled
        />
        <br />
        <label htmlFor="description">Product Description:</label>
        <textarea
          id="description"
          name="description"
          value={props.Data.description}
          disabled
        />
        <br />
        <label htmlFor="price">Product Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={props.Data.price}
          disabled
        />
        <br />
        <label htmlFor="discount">Product Discount:</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={props.Data.discount}
          disabled
        />
        <br />
        <label htmlFor="color">Product Color:</label>
        <input type="text" id="color" name="color" value={color} disabled />
        <br />
        <label htmlFor="sizes">Available Sizes:</label>
        <ul>
          {sizes?.map((size) => (
            <div id="sizes"> 
              <input
          type="String"
          id="Sizetype"
          name="sizetype"
          value={size.name}
          disabled
        />
        <input
          type="number"
          id="id"
          name="sizecount"
          value={size.stock}
          disabled
        />

            </div>
          ))}
        </ul>
        <br />
        <label htmlFor="sellingPrice">Selling Price:</label>
        <input
          type="number"
          id="sellingPrice"
          name="sellingPrice"
          value={props.Data.sellingPrice}
          disabled
        />
        <br />
        <label htmlFor="images">Product Images:</label>
        <ul>
          {imgs?.map((image, index) => (
            <div>
              <li key={index}>
                <img src={image} alt={`Image ${index + 1}`} width="100" />
              </li>
              <input
          type="string"
          id="imagelink"
          name="imagelink"
          value={image}
          disabled
        />
        <br />
            </div>
          ))}
        </ul>
        <br />
        <button type="button" onClick={enableform}>
          Disable Form
        </button>
      </form>
    </div>
  );
}
