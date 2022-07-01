import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Header, CreateContainer, MainContainer } from "./components";

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-24 p-8 w-full">
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
