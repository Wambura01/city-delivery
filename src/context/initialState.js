import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser(); // user info from local storage

export const initialState = {
  user: userInfo,
};
