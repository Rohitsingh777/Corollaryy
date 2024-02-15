import { adminState } from "../atoms/email";
import {selector} from "recoil";

export const isadminLoading = selector({
  key: 'adminLoadingState',
  get: ({get}) => {
    const state = get(adminState);

    return state.isLoading;
  },
});