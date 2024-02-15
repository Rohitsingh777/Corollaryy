import { Button, Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/email";
export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setadmin = useSetRecoilState(adminState) ;
  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "row",
      }}
    >
      <div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>Corollary</h1>
          We make poetry
        </div>
        <Card
          style={{
            height: "fit-content",
            width: "40vw",
            display: "flex",
            background: "lightblue",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2>Sign in </h2>
          </div>
          <br />
          <form
            style={{
              width: "90%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "100%",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <label>
                {" "}
                Email :{" "}
                <input
                  type="text"
                  placeholder="Email@xxx.com"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></input>
              </label>
            </div>

            <br />
            <div style={{ width: "100%" }}>
              <label>
                Password:
                <input
                  type="text"
                  placeholder="PASSXXXRD"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </label>
            </div>

            <br />

            <div style={{width: '100%' , justifyContent:'center' , display:'flex'}}>

            <Button
              style={{ height: "4vh", width: "5vw", background: "black", color:'white' }}
              onClick={async () => {
                const  x = document.getElementById("errdiv");
                  x.innerHTML = "";

                try {
                  let response = await axios.post(
                    `http://localhost:3000/admin/login`,
                        {
                            username,password
                        }
                  );

                  if (response.data.token){
                    console.log(response.data)
                    let token = response.data.token;
                    localStorage.setItem("token", token);
                    setadmin({isLoading: false , adminmail : username})
                    navigate("/admin");
                  }
                  else{
                    const  x = document.getElementById("errdiv");
                     x.innerHTML = "password or email incorrect ";
                  }
                  
                } 
                catch {
                  const x = document.getElementById("errdiv");
                  x.innerHTML = "password or email incorrect ";
                }
              }}
            >
              SIGNIN
            </Button>
            </div>
            
            <br/>
            <div id="errdiv"></div>
          </form>
        </Card>
      </div>
    </div>
  );
}
