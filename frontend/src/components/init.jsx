import { useRecoilState, useSetRecoilState } from "recoil";
import { adminmail } from "../store/selectors/admin";
import { isadminLoading } from "../store/selectors/adminloading";
import { useNavigate } from "react-router-dom";
import { adminState } from "../store/atoms/email";
import { useEffect } from "react";
import axios from "axios";

export default function Init() {
  const navigate = useNavigate();
  const setadminstate = useSetRecoilState(adminState)
  const init = async () => {
    const token = localStorage.getItem("token");
    if (token){
        console.log(token);
        const tok = `BEARER ${token}`;
        const res = await axios.get(
          `http://localhost:3000/admin/me`,{
             headers: { authorization: tok } }
        );
        if (res.data.username) {
            setadminstate({isLoading:false, adminmail: res.data.username})
            navigate("/admin");
        } else {
          navigate("/");
        }}
        else{
            navigate("/")
        }
  };
  useEffect(() => {
    init();
  }, []);

  return <></>;
}
