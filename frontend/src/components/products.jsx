import { useEffect, useState } from "react";
import styles from './product.module.css'; // Example import statement
import { Button, AppBar, Toolbar, Typography } from '@mui/material';


function useAllproducts(){
    const [ allproducts , setAllproducts ] = useState([]);
    useEffect(()=>{

        fetch('http://localhost:3000/allproducts/')
        .then((result)=>result.json())
        .then((data)=>{
            setAllproducts(data); 
           // console.log(`printed in hook ${JSON.stringify(data)}`)
        })
    },[])
    
    return allproducts; 
}

function useOneproducts(_id){
    const [ oneproducts , setOneproducts ] = useState([]);
    useEffect(()=>{

        fetch(`http://localhost:3000/product/${_id}`)
        .then((result)=>result.json())
        .then((data)=>{
            setOneproducts(data); 
           // console.log(`printed in hook ${JSON.stringify(data)}`)
        })
    },[])
    
    return oneproducts; 
}

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
return(
<div style={{color:'blueviolet',border:'2px solid black'}} onClick={()=>{console.log(`${props.product.name}`)}}
className="oneprod"
>
<div className="imgdiv"><img src={props.product.variants[0].images[0]} alt={props.product.name} /></div>
<div style={{padding:'2%' ,boxSizing: "border-box",width:'100%',display:'flex',justifyContent:'space-between'}}>
<Typography fontWeight={500000}>{props.product.name}</Typography>
<Typography fontWeight={500000}>${props.product.price}</Typography>
</div>

</div>
)
}

export default Products;

