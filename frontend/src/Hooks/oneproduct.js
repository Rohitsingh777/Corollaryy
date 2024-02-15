import axios from "axios";
import { useState, useEffect } from "react";

export default function useOneproduct(_id){
    const [ oneproduct , setOneproducts ] = useState({});

    const token = localStorage.getItem('token');
    useEffect(()=>{
        
        async function getp()  {
        const res = await axios.get(`http://localhost:3000/admin/product/${_id}` , {headers:{authorization : `BEARER ${token}`}})
           if (res.status === 200 ){
            setOneproducts(res.data)
           }
           else{
            setOneproducts({})
           }
        }
        getp() ;
          },[])

    return oneproduct; 
}
