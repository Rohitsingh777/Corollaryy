import { adminState } from "../atoms/email";
import {selector} from "recoil";

export const adminmail = selector({
  key: 'admin_mail',
  get: ({get}) => {
    const state = get(adminState);
    return state.adminmail;
  },
});
