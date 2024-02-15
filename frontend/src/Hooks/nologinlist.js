import { useState } from "react";
import { useEffect } from "react";


export default function useAllproducts(){
    const [ allproducts , setAllproducts ] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/nologin/allproducts')
        .then((result)=>result.json())
        .then((data)=>{
            setAllproducts(data); 
            console.log(`printed in hook ${JSON.stringify(data)}`)
        })
    },[])
    
    return allproducts; 
}

