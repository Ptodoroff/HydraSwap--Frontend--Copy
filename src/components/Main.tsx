import styled from "styled-components";
import Image from "./Image";
import Input from "./Input";
import "../App.css";
import { useConnectWallet } from "@web3-onboard/react";
import { useState } from "react";
import { ethers } from "ethers";
import { ApproveandStake, ButtonCluster } from "./Input";

interface DarkProps {
  darkMode: boolean;
  dark?: any;
  onClick?: any;
}

const ConnectButton = styled.div<DarkProps>`
  width: 518px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#1d2e48" : "#e1f2ff")};
  border-radius: 20px;
  border: none;
  color: ${(props) => (props.darkMode ? `#6da8ff` : `#026fc2`)};
  font-weight: 200;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    width: 60vw;
    height: 5vh;
    border-radius: 12px;
  }
`;

const Body = styled.div<DarkProps>`
  font-size: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: ${(props) =>
    props.darkMode
      ? "radial-gradient(50% 50% at 50% 50%, rgba(2, 111, 194, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
      : "radial-gradient(50% 50% at 50% 50%, rgba(33, 114, 229, 0.1) 0%, rgba(33, 36, 41, 0) 100%)"};
  min-width: auto;
  min-height: 830px;
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
position: 'absolute';
background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
display:flex;
align-items:center;
justify-content:space-between;
flex-direction:column;
width: 512px;
height 215px;
border-radius: 30px;
font-weight: 200;
font-size:20px;
border:2px;
position: relative;
z-index: 10;
box-shadow:0px 0px 25px rgba(2, 111, 194, 0.5);
padding:16px;
margin-top: 70px;
color: ${(props) => (props.darkMode ? "white" : "black")};

@media(max-width: 1000px) {
width: 60vw;
height 25vh;
}


`;

export default function Main({ darkMode }: DarkProps) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();

  return (
    <Body darkMode={darkMode}>
      <div id="stakingDiv">
        <span id="changeTicker">$CHANGE</span>Staking
      </div>
      <Wrapper className="wrapper">
        <Image className="dragon--logo--left" src="/hydra-guard.png" />{" "}
        <SwapBox darkMode={darkMode}>
          Stake
          <Input darkMode={darkMode} />
          {wallet ? (
            <ButtonCluster>
              <ApproveandStake darkMode={darkMode} style={{ marginRight: 30 }}>
                {" "}
                Approve{" "}
              </ApproveandStake>
              <ApproveandStake darkMode={darkMode} style={{ marginLeft: 30 }}>
                {" "}
                Stake{" "}
              </ApproveandStake>
            </ButtonCluster>
          ) : (
            <ConnectButton
              darkMode={darkMode}
              onClick={() => {
                connect();
              }}
            >
              {" "}
              Connect Wallet{" "}
            </ConnectButton>
          )}
        </SwapBox>
        <Image className="dragon--logo--right" src="/hydra-guard.png" />{" "}
      </Wrapper>
    </Body>
  );
}
