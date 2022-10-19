import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useState } from "react";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const dark = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Header darkMode={darkMode} dark={dark} />
        <Main />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
