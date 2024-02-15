import Products from "./products";
import { adminState } from '../store/atoms/email'
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Landing(){
    // const admin = useRecoilValue(adminState).adminmail
    // const navigate = useNavigate()
    // useEffect(()=>{
    //     if (admin){
    //         navigate("/admin")
    //     }
    // },[])

    // if (admin){
    //     navigate("/admin")
    //     return<></>
    // }
    return(
       <div>U ARE NOT LOGGED IN Corollary</div>
    )
}