import React from "react";
import { motion } from "framer-motion";

import { MdShoppingBasket } from "react-icons/md";

function RowContainer({ flag, data }) {
  console.log(data);
  return (
    <div
      className={`w-full flex items-center my-12 ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            ey={item.id}
            className="w-300 min-w-[300px] md:w-340 md:min-w-[340px] gap-3 h-auto bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                className="w-40 -mt-8 drop-shadow-2xl"
                src="https://firebasestorage.googleapis.com/v0/b/city-delivery-1f074.appspot.com/o/Images%2F1658750060620-i1.png?alt=media&token=5767c1d4-8164-4e38-8bec-3b7a0e58faf8"
                alt="food or drink"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 cursor-pointer hover:shadow-md flex items-center justify-center"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                Chocolate Vanilla
              </p>
              <p className="mt-1 text-sm text-gray-500">45 Calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">Ksh. </span>550
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RowContainer;
