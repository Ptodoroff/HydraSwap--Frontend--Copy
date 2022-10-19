import styled from "styled-components";
import Image from "./Image";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

interface DarkProps {
  darkMode: boolean;
  dark?: any;
}

const ConnectButton = styled.button<DarkProps>`
  width: 168px;
  font-size: 17px;
  height: 37px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#153d6f" : "#e1f2ff")};
  border-radius: 12px;
  border: none;
  color: #026fc2;
  font-weight: 200;
  margin-right: 15px;
  &:hover {
    border: 1px solid #026fc2;
    cursor: pointer;
  }
`;

const ConnectedButton = styled.button<DarkProps>`
  display: flex;
  align-items: center;
  width: 167px;
  font-size: 17px;
  height: 37px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#153d6f" : "#e1f2ff")};
  border-radius: 12px;
  border: none;
  color: #026fc2;
  font-weight: 200;
  margin-right: 10px;
  &:hover {
    border: 1px solid #026fc2;
    cursor: pointer;
  }
`;
const HeaderFrame = styled.div<DarkProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 98.1vw;
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

const StakingTitleWrap = styled.div<DarkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
  width: 9%;
  height: 46px;
  padding: 2px;
  border-radius: 12px;
  margin-left: 190px;
  font-family: Arial;
  font-weight: 600;
`;

const BalanceDiv = styled.div<DarkProps>`
  margin-left: 3px;
  width: 95px;
  height: 30px;
  background-color: ${(props) => (props.darkMode ? "#153d6f" : "#e1f2ff")};
  border-radius: 10px;
  border-left: 1px solid #026fc2;
  color: #026fc2;
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
  const [balance, setBalance] = useState("");

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5],
  });
  const { chainId, account, activate, deactivate, active, library } =
    useWeb3React<Web3Provider>();
  const connect = () => {
    activate(injectedConnector);
  };

  const stop = () => {
    deactivate();
  };

  useEffect(() => {
    library?.getBalance(account!).then((result: any) => {
      setBalance(String(result / 1e18));
    });
  }, [account, library, chainId]);
  useEffect(() => {
    console.log(chainId, account, active);
  });

  return (
    <>
      <HeaderFrame darkMode={darkMode}>
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
        <StakingTitleWrap darkMode={darkMode}>
          <div
            style={{
              borderRadius: 8,
              backgroundColor: darkMode ? "#40444f" : "#e8e8e8",
              padding: 8,
              color: darkMode ? "white" : "black",
            }}
          >
            Staking
          </div>
        </StakingTitleWrap>
        <div style={{ display: "flex" }}>
          {account ? (
            <ConnectedButton darkMode={darkMode} onClick={stop}>
              {`0x...${account.slice(-3)}`}
              <BalanceDiv darkMode={darkMode}>
                {" "}
                {`${Number(balance).toFixed(3)} ETH`}
              </BalanceDiv>
            </ConnectedButton>
          ) : (
            <ConnectButton darkMode={darkMode} onClick={connect}>
              {" "}
              Connect to a wallet
            </ConnectButton>
          )}
          <ThemeToggle darkMode={darkMode} onClick={dark}>
            {darkMode ? (
              <Image src="/moon.png" style={{ width: 22 }} />
            ) : (
              <Image src="/sun.svg" style={{ width: 22 }} />
            )}
          </ThemeToggle>
        </div>
      </HeaderFrame>
    </>
  );
}
