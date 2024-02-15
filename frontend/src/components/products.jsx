import { useEffect, useState } from "react";
import styles from './product.module.css'; // Example import statement
import { Typography } from '@mui/material';
import useAllproducts from "../Hooks/adminhooks/products";
import { useNavigate } from "react-router-dom";

function Products(){
const  Data = useAllproducts(); 
    return(
    <div style={{display:"flex",justifyContent:'space-around' ,flexWrap:"wrap"}} className={styles.products}>
       {Data.map((product,index)=> (
                <Oneproduct product={product} key={index}></Oneproduct>
            ))}
    </div> 
        )
}
function Oneproduct(props){
const navigate = useNavigate();
const id = props.product._id; 
return(
<div style={{color:'blueviolet',border:'2px solid black'}} onClick={()=>{
      navigate(`/products/${id}`);
}}
className="oneprod"
>
<div className="imgdiv"><img src={props.product.images[0]} alt={props.product.name} /></div>
<div style={{padding:'2%' ,boxSizing: "border-box",width:'100%',display:'flex',justifyContent:'space-between'}}>
<Typography fontWeight={500000}>{props.product.name}</Typography>
<Typography fontWeight={500000}>${props.product.price}</Typography>
</div>
</div>
)
}

export default Products;

