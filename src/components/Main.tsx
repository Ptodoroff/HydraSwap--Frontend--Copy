import React from "react";
import styled from "styled-components";
import Image from "./Image";
import Input from "./Input";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

interface DarkProps {
  darkMode: boolean;
  dark?: any;
}

const ConnectButton = styled.div<DarkProps>`
  width: 518px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#153d6f" : "#e1f2ff")};
  border-radius: 12px;
  border: none;
  color: #026fc2;
  font-weight: 200;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const Body = styled.div<DarkProps>`
  padding-top: 10px;
  background-image: ${(props) =>
    props.darkMode
      ? "radial-gradient(50% 50% at 50% 50%, rgba(2, 111, 194, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
      : "radial-gradient(50% 50% at 50% 50%, rgba(33, 114, 229, 0.1) 0%, rgba(33, 36, 41, 0) 100%)"};
  width: 100vw;
  height: 790px;
  background-color: ${(props) =>
    props.darkMode ? "rgb(44, 47, 54)" : "rgb(247, 248, 250)"};
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwapBox = styled.div<DarkProps>`
background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
display:flex;
align-items:center;
justify-content:space-between;
flex-direction:column;
width: 550px;
height 225px;
border-radius: 30px;
font-weight: 100;
border:2px;
position: relative;
z-index: 10;
box-shadow:0px 0px 25px rgba(2, 111, 194, 0.5);
padding:16px;
font-family: "Arial" ;
margin-top: 70px;
color: ${(props) => (props.darkMode ? "white" : "black")};

`;

export default function Main({ darkMode }: DarkProps) {
  const { chainId, account, activate, deactivate, active, library } =
    useWeb3React<Web3Provider>();
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const connect = () => {
    activate(injectedConnector);
  };
  return (
    <Body darkMode={darkMode}>
      <Wrapper>
        <Image
          src="/hydra-guard.png"
          style={{
            right: 250,
            height: 461,
            width: 200,
            transform: `rotateY(180deg)`,
            opacity: 0.2,
          }}
        />{" "}
        <SwapBox darkMode={darkMode}>
          Stake
          {account ? (
            <Input darkMode={darkMode} />
          ) : (
            <ConnectButton darkMode={darkMode} onClick={connect}>
              {" "}
              Connect Wallet{" "}
            </ConnectButton>
          )}
        </SwapBox>
        <Image
          src="/hydra-guard.png"
          style={{
            left: 250,
            height: 461,
            width: 200,
            opacity: 0.2,
          }}
        />{" "}
      </Wrapper>
    </Body>
  );
}
