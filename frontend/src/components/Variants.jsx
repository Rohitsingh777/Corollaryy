import { useState } from "react";
import { useRecoilState } from "recoil";
import { variantstate } from "../store/atoms/variants";

export default function Variants() {
  const [inputList, setinputList] = useRecoilState(variantstate);
  const handleinputchange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setinputList(list);
  };

  const handleremove = (e,index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList,""]);
  };

  return (
    <div style={{ margin: '10px' }} >
      {inputList.map((x, i) => {
        return (
          <div key={`varint_${i}`}>
            <label>{i+1}</label>
            <input
              type="text"
              name="variant"
              placeholder="enter variants prod id"
              onChange={(e) => handleinputchange(e, i)}
              value={inputList[i]}
            />
            
              <button
                style={{ background: "red" }}
                onClick={() => handleremove(i)}
              >
                Remove
              </button>
            
          </div>
        );
      })}

<button onClick={handleaddclick}>Add More</button>

    </div>
  );
}
