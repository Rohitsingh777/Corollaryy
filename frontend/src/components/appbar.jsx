import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminState } from "../store/atoms/email";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { variantstate } from "../store/atoms/variants";
import { imagestate } from "../store/atoms/images";
import { Sizestate } from "../store/atoms/Sizes";

export default function AppBar(){
    const navigate = useNavigate(); 
    const admin = useRecoilValue(adminState).adminmail
    const setadmin = useSetRecoilState(adminState)

const [variant, setvariant] = useRecoilState(variantstate);
const [images, setimages] = useRecoilState(imagestate);
const [size, setsize] = useRecoilState(Sizestate);



    function onclickforaddprod(){

    setvariant([]);
    setimages([""]);
    setsize([{name:'', stock:''}])
      navigate('/addproduct')
    }





    if (!admin){
        return(
            <div style={{height:'7vh', background:'red',fontSize:'6vh',display:'flex',justifyContent:'space-between'}}>
            
            <span style={{background:'blue',color:'white'}} onClick={() =>{
                navigate('/')
            }}>Corollary
            </span>
            <div>
            <button onClick={() =>{
                navigate('/Signup')
            }} >SIGNUP</button>
            <button onClick={() =>{
                navigate('/Signin')
            }}>SIGNIN</button>
            </div>
             </div>
            )
    }
    else{
        return(
            <div style={{height:'7vh', background:'red',fontSize:'6vh',display:'flex',justifyContent:'space-between'}}>
            <span style={{background:'blue',color:'white'}} onClick={() =>{
                navigate('/admin')
            }}>Corollary
            </span>

            <div>
<button onClick={ onclickforaddprod }> 
Add prod 
</button>
            <button onClick={() =>{

                setadmin({isLoading : true , adminmail : null })
                localStorage.clear()
                navigate('/')

            }} >Logout</button>
            </div>
             </div>
            )

    }





}