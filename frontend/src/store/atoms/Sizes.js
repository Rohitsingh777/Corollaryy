import {atom} from "recoil";

export const Sizestate = atom({
  key: 'sizes',
  default: [{name:'', stock:''}]
});
