import {atom} from "recoil";

export const adminState = atom({
  key: 'admin',
  default: {
    isLoading: true,
    adminmail: null
  },
});
