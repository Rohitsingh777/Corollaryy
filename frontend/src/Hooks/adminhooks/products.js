import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Products from "../../components/products";


export default function useAllproducts()
{
    const [ allproducts , setAllproducts ] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(()=>{
        
        async function getp()  {
        const res = await axios.get(`http://localhost:3000/admin/allproducts` , {headers:{authorization : `BEARER ${token}`}})
           if (res.status === 200 ){
            setAllproducts(res.data)
           }
           else{
            setAllproducts([])
           }
        }
        getp() ;
          },[])
          return allproducts ;
        }

