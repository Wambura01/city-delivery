import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { MdShoppingBasket } from "react-icons/md";

import NotFound from "../../assets/NotFound.svg";

import { useStateValue } from "../../context/stateContext";
import { actionType } from "../../context/reducer";

function RowContainer({ flag, data, scroll }) {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  //add item to cart
  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scroll;
  }, [scroll]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-300 h-auto min-w-[300px] md:w-340 md:min-w-[340px] gap-3 flex flex-col items-center justify-between bg-cardOverlay rounded-lg p-2 my-12 md:ml-3 backdrop-blur-lg hover:drop-shadow-lg"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  className="w-full h-full object-contain"
                  src={item?.imageURL}
                  alt="food or drink"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 cursor-pointer hover:shadow-md flex items-center justify-center"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">Ksh. </span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="Not Found" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items not Available!!
          </p>
        </div>
      )}
    </div>
  );
}

export default RowContainer;
