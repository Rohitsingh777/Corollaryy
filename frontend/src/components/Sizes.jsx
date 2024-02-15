import { useState } from "react";
import { useRecoilState } from "recoil";
import { Sizestate } from "../store/atoms/Sizes";

export default function Sizes(){
const [inputList, setinputList]= useRecoilState(Sizestate)

  const handleinputchange=(e, index)=>{
    e.preventDefault();
    const {name, value}= e.target;
    const list= [...inputList];
    //list[index][name]= value;
    list[index] = { ...list[index], [name]: value };
    setinputList(list);
  }
 
  const handleremove= (index)=>{
    const list=[...inputList];
    
    console.log('before : ',list);
    list.splice(index,1);
    console.log(index);
    setinputList(list);
    console.log('after : ',list)
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { name :'', stock:''}]);
  }

    return (
<div style={{ margin: '10px' }}>

{   inputList.map( (x,i)=>{
        return(
        <div key={`sizes_${i}`} style={{backgroundColor : '#e5b1b1', margin:'2px'}}>
           
           <label >name : </label>
            <input type="text"  name="name"  placeholder="Enter name of size " onChange={ e=>handleinputchange(e,i)} value={inputList[i]?.name} />
          <br />
           <label >stock : </label>
            <input type="number"  name="stock" placeholder="Enter stock no. " onChange={ e=>handleinputchange(e,i)} value={inputList[i]?.stock} />
         {
            inputList.length!==1 &&
            <button  style={{background:'red'}} onClick={()=> handleremove(i)}>Remove</button>
         }
         { inputList.length-1===i &&
         <button  onClick={handleaddclick}>Add More</button>
         }
    
      </div>
        ) } )

}



        </div>
    
      


    )
}