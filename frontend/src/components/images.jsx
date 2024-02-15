import { useState } from "react";
import { useRecoilState } from "recoil";
import { imagestate } from "../store/atoms/images";

export default function Images() {
  const [inputList, setinputList] = useRecoilState(imagestate);

  const handleinputchange = (e, index) => {
   

    const { value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
   
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
   
    setinputList([...inputList, ""]);
  };

  return (
    <div style={{ margin: '10px' }} >
      {inputList.map((x, i) => {
        return (
          <div key={`image_${i}`}>
            <label>{i+1}</label>
            <input
              type="text"
              name="imagelink"
              placeholder="Enter img url "
              onChange={(e) => handleinputchange(e, i)}
              value={inputList[i]}
            />
            {inputList.length !== 1 && (
              <button
                style={{ background: "red" }}
                onClick={() => handleremove(i)}
              >
                Remove
              </button>
            )}
            {inputList.length - 1 === i && (
              <button onClick={handleaddclick}>Add More</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
