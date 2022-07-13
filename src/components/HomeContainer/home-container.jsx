import React from "react";

import Bike from "../../assets/delivery.png";
import Hero from "../../assets/heroBg.png";

function HomeContainer() {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-2 flex flex-col items-start justify-center flex-1 gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
            <img
              className="w-full h-full object-contain bg-white"
              src={Bike}
              alt="delivery bike"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            {" "}
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Whether you need to move food across the city, between towns or within
          the city, we have you covered. Our ultimatum is to bring round the
          clock food delivery services to you as the best in town. We are a
          dedicated team with ultimate fleet core and the best, fresh food
          across Nairobi city!
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex items-center flex-1 relative">
        <img
          src={Hero}
          className="h-420 w-full lg:h-650 lg:w-auto ml-auto"
          alt="hero background"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center px-32 py-4">
          <div className="w-190 p-2 bg-cardOverlay backdrop-blur-md"></div>
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
