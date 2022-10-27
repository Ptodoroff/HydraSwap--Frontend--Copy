import styled from "styled-components";
import Image from "./Image";
import Input from "./Input";
import "../App.css";
import { useConnectWallet } from "@web3-onboard/react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ApproveandStake, ButtonCluster } from "./Input";
import MirrorStakingABI from "../contracts/MirrorStaking.json";
import ChangeXABI from "../contracts/ChangeX.json";

interface DarkProps {
  darkMode: boolean;
  dark?: any;
  onClick?: any;
}

const ConnectButton = styled.div<DarkProps>`
  width: 518px;
  font-size: 17px;
  display: flex;
  margin-top: 1em;
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
  z-index: 1;
  position: "absolute";
  background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 512px;
  border-radius: 30px;
  font-weight: 200;
  font-size: 20px;
  border: 2px;
  position: relative;
  box-shadow: 0px 0px 25px rgba(2, 111, 194, 0.5);
  padding: 16px;
  margin-top: 70px;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  @media (max-width: 1000px) {
    width: 60vw;
    height: 25vh;
  }
`;

const Apy = styled.div<DarkProps>`
  position: absolute;
  margin-top: 25.5em;
  font-size: 0.6em;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 25px rgba(2, 111, 194, 0.5);
  border-radius: 20px;
  padding: 0.5em;
  width: 25em;
  z-index: -0.5;
  background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
`;

const RestakeAndWithdrawButtons = styled.div<DarkProps>`
  display: flex;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

const AnnualReward = styled.div<DarkProps>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

const ApyPercent = styled.div<DarkProps>`
  display: flex;
  color: ${(props) => (props.darkMode ? "white" : "black")};

  justify-content: space-between;
`;

export default function Main({ darkMode }: DarkProps) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();
  let stakedBalance: number = 0;
  let earnedRewards: number = 0;
  const [changeXBalance, setChangeXBalance] = useState<number | null>();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      console.log(wallet.accounts[0].balance);
    }
    getStakedBalance();
    getCurrentRewards();
  }, [wallet]);

  //===============================================
  //Mirror Staking contract instance
  //===============================================
  const signer: any = ethersProvider?.getSigner();
  const MirrorStakingAddress: string =
    "0x48309699c488ad207Dd9d228bBb013cF848a6e50";
  const mirrorStakingContract = new ethers.Contract(
    MirrorStakingAddress,
    MirrorStakingABI,
    signer
  );

  //=========================================================
  // ChangeX token contract instance and function invocations
  //=========================================================

  const ChangeXTokenAddress: string =
    "0x7051faED0775f664a0286Af4F75ef5ed74e02754";
  const changeXContract = new ethers.Contract(
    ChangeXTokenAddress,
    ChangeXABI,
    signer
  );
  const getStakedBalance = async () => {
    await mirrorStakingContract.balance(wallet?.accounts[0].address);
  };

  const stakeTokens = async () => {
    let approve = await changeXContract.approve(
      mirrorStakingContract.address,
      changeXBalance
    );
    let response = await approve.wait();
    response
      ? console.log("success")
      : console.log("tx for approving tokens has failed");
    let stake = await mirrorStakingContract.stake(changeXBalance);
    let response1 = await stake.wait();
    response1
      ? console.log(`successfully staked ${changeXBalance}`)
      : console.log("tx for staking tokens has failed");
  };

  const unstakeTokens = async () => {
    let unstake = await mirrorStakingContract.unstake(changeXBalance);
    let response = await unstake.wait();
    response
      ? console.log(`successfully unstaked ${changeXBalance} $CHANGE`)
      : console.log("tx for unstaking tokens has failed");
  };

  const getCurrentRewards = async () => {
    earnedRewards = await Number(
      mirrorStakingContract.earned(wallet?.accounts[0])
    );
  };
  return (
    <Body darkMode={darkMode}>
      <div id="stakingDiv">
        <span id="changeTicker">$CHANGE</span>Staking
      </div>
      <Wrapper className="wrapper">
        <Image className="dragon--logo--left" src="/hydra-guard.png" />{" "}
        <SwapBox darkMode={darkMode}>
          Stake
          <Input
            darkMode={darkMode}
            setChangeXBalance={setChangeXBalance}
            changeXBalance={changeXBalance}
          />
          {wallet ? (
            <>
              <p id="stakedBalance">Staked Balance: {stakedBalance}</p>
              <ButtonCluster>
                <ApproveandStake
                  darkMode={darkMode}
                  style={{ marginRight: 30 }}
                  onClick={stakeTokens}
                >
                  {" "}
                  Stake{" "}
                </ApproveandStake>
                <ApproveandStake
                  darkMode={darkMode}
                  style={{ marginLeft: 30 }}
                  onClick={unstakeTokens}
                >
                  {" "}
                  Unstake{" "}
                </ApproveandStake>
              </ButtonCluster>
              <div id="restakeWithdrawDiv">
                Current profit: {earnedRewards} CHANGE
                <RestakeAndWithdrawButtons darkMode={darkMode}>
                  <ApproveandStake id="Restake" darkMode={darkMode}>
                    Restake
                  </ApproveandStake>
                  <ApproveandStake id="Withdraw" darkMode={darkMode}>
                    Withdraw
                  </ApproveandStake>
                </RestakeAndWithdrawButtons>
              </div>
            </>
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
      {wallet ? (
        <Apy darkMode={darkMode}>
          <AnnualReward darkMode={darkMode}>
            <span>Projected Annual Reward </span>
            <span> 0 CHANGE</span>
          </AnnualReward>
          <ApyPercent darkMode={darkMode}>
            <span>APY</span>
            <span> 9.3%</span>
          </ApyPercent>
        </Apy>
      ) : (
        " "
      )}
    </Body>
  );
}
