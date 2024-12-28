import { useState } from "react";

import Header from "./components/Header/Header";
import MainContainer from "./containers/MainContainer";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;
