import React from "react";
import { motion } from "framer-motion";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import HomeContainer from "../HomeContainer/home-container";
import RowContainer from "../RowContainer/row-container";
import { useStateValue } from "../../context/stateContext";

function MainContainer() {
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <div className="flex w-full h-auto flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & Healthy foods
          </p>
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer items-center justify-center flex transition-all duration-100 ease-in-out hover:shadow-lg"
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer items-center justify-center flex transition-all duration-100 ease-in-out hover:shadow-lg"
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          data={foodItems?.filter((item) => item.category === "fruits")}
          flag={true}
        />
      </section>
    </div>
  );
}

export default MainContainer;
