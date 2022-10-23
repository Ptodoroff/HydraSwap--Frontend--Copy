import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";

function App() {
  const GOERLI_RPC_URL = `https://goerli.infura.io/v3/d92c482888c64718a93cfbc3082b73be`; /// iMPORTANT - SHOULD FIX IT PROCE.ENV.REACT_APP_GOERLI_KEY WONT WORK

  const injected = injectedModule();

  const ethereumGoerli = {
    id: "0x5",
    token: "gETH",
    label: "Goerli",
    rpcUrl: GOERLI_RPC_URL,
  };
  const chains = [ethereumGoerli];
  const wallets = [injected];

  const web3Onboard = init({
    wallets,
    chains,
  });

  const [darkMode, setDarkMode] = useState(false);
  const dark = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <div className="App">
        <Header darkMode={darkMode} dark={dark} />
        <Main darkMode={darkMode} />
      </div>
    </Web3OnboardProvider>
  );
}

export default App;
