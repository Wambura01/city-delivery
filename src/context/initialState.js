import { fetchUser, fetchCart } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser(); // user info from local storage
const cartInfo = fetchCart(); // cart info from local storage

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
