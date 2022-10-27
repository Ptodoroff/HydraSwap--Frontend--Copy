import styled from "styled-components";
import Image from "./Image";
import { useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import "../App.css";

interface DarkProps {
  darkMode: boolean;
  dark?: any;
  onClick?: any;
}

const ConnectButton = styled.button<DarkProps>`
  width: 168px;
  font-size: 15px;
  height: 37px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#1d2e48" : "#e1f2ff")};
  border-radius: 12px;
  border: none;
  color: ${(props) => (props.darkMode ? `#6da8ff` : `#026fc2`)};
  font-weight: 500;
  margin-right: 15px;
  &:hover {
    border: 1px solid #026fc2;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    margin-right: 3px;
    margin-left: 3px;
  }
`;

const ConnectedButton = styled.button<DarkProps>`
  display: flex;
  align-items: center;
  width: 167px;
  font-size: 15px;
  height: 37px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#1d2e48" : "#e1f2ff")};
  border-radius: 12px;
  border: none;
  color: #6da8ff;
  font-weight: 500;
  margin-right: 10px;
  &:hover {
    border: 1px solid #026fc2;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    margin-left: 5px;
  }
`;
const HeaderFrame = styled.div<DarkProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: auto;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  font-weight: 500;
  background-image: ${(props) =>
    props.darkMode
      ? "radial-gradient(50% 50% at 50% 50%, rgba(33, 114, 229, 0.1) 0%, rgba(33, 36, 41, 0) 100%)"
      : "radial-gradient(50% 50% at 50% 50%, rgba(2, 111, 194, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"};

  background-color: ${(props) =>
    props.darkMode ? "rgb(44, 47, 54)" : "rgb(247, 248, 250)"};
`;

const BalanceDiv = styled.div<DarkProps>`
  margin-left: 3px;
  width: 95px;
  height: 30px;
  background-color: ${(props) => (props.darkMode ? "#1d2e48" : "#e1f2ff")};
  border-radius: 10px;
  border-left: 1px solid #026fc2;
  color: #6da8ff;
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
`;

const ThemeToggle = styled.button<DarkProps>`
  height: 35px;
  width: 42px;
  border-radius: 10px;
  margin: 0px !important;
  border: none;
  background-color: ${(props) => (props.darkMode ? `#40444f` : `#e8e8e8`)};
  &:hover {
    cursor: pointer;
  }
`;
export default function Header({ dark, darkMode }: DarkProps) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      console.log(wallet.accounts[0].balance);
    }
  }, [wallet]);
  return (
    <>
      <HeaderFrame darkMode={darkMode}>
        <a href="https://changex.io/" target="_blank">
          <Image
            darkMode={darkMode}
            src="/hydra-logo.png"
            style={{
              width: 50,
              backgroundColor: darkMode ? `white` : `#edeef2`,
              borderRadius: 50,
              borderStyle: "none",
            }}
          />
        </a>

        <div style={{ display: "flex" }}>
          {connecting ? (
            <ConnectedButton darkMode={darkMode}>
              {`0x...`}
              <BalanceDiv darkMode={darkMode}>
                {" "}
                {`${Number(wallet?.accounts[0].balance).toFixed(3)} ETH`}
              </BalanceDiv>
            </ConnectedButton>
          ) : (
            <ConnectButton
              darkMode={darkMode}
              onClick={() => {
                connect();
              }}
            >
              Connect to a wallet
            </ConnectButton>
          )}
          <ThemeToggle darkMode={darkMode} onClick={dark}>
            {darkMode ? (
              <Image src="/moon.png" style={{ width: 22 }} />
            ) : (
              <Image src="/sun.svg" style={{ width: 22, paddingTop: 4 }} />
            )}
          </ThemeToggle>
        </div>
      </HeaderFrame>
    </>
  );
}
