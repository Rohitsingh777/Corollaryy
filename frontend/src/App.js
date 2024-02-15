import './App.css';
import AppBar from './components/appbar';
import Products from './components/products';
import React from 'react';
import Signup from './components/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Signin from './components/signin';
import Adminlanding from './components/adminlanding'
import Init from './components/init'
import { RecoilRoot } from 'recoil';
import { useParams } from 'react-router-dom';
import Productdetails from './components/Productdetail';
import Addproduct from './components/addprod';
import Productedit from './components/productedit';


function App() {
  return (
      <Router>
        <RecoilRoot>
        <div style={{background:'#00cfd47a', width:'100vw'}}>
        <AppBar />
        <Init /> 
        <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/Signin"} element={<Signin />} />
        <Route path={"/Signup"} element={<Signup />} />
        <Route path={"/admin"} element={<Adminlanding />} />
        <Route path="/products/:productId" element={<Productedit/>} />
        <Route path="/addproduct" element={<Addproduct/>} />
        </Routes>
        </div>
        </RecoilRoot>
      </Router>
  );
}



export default App;
