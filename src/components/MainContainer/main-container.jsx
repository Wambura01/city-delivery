import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import HomeContainer from "../HomeContainer/home-container";
import RowContainer from "../RowContainer/row-container";
import MenuContainer from "../MenuContainer/menu-container";
import CartContainer from "../CartContainer/cart-container";

import { useStateValue } from "../../context/stateContext";

function MainContainer() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {}, [scroll]);

  return (
    <div className="flex w-full h-auto flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & Healthy fruits
          </p>
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer items-center justify-center flex hover:shadow-lg"
              onClick={() => setScroll(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer items-center justify-center flex hover:shadow-lg"
              onClick={() => setScroll(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scroll={scroll}
          data={foodItems?.filter((item) => item.category === "fruits")}
          flag={true}
        />
        <MenuContainer />
        <CartContainer />
      </section>
    </div>
  );
}

export default MainContainer;
