import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Header, CreateContainer, MainContainer } from "./components";
import { useStateValue } from "./context/stateContext";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) =>
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 md:px-16 px-4 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />}></Route>
            <Route path="/createItem" element={<CreateContainer />}></Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
