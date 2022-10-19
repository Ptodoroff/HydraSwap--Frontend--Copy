import styled from "styled-components";
import Image from "./Image";
import { useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

const SelectedTokenInfo = styled.button`
  height: 32px;
  width: 145px;
  border-radius: 12px;
  border: none;
  font-size: 20px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #f8f8f8;
    cursor: pointer;
  }
`;

const Max = styled.button`
  width: 40px;
  height: 28px;
  background-color: #e1f2ff;
  border-radius: 12px;
  border: none;
  color: #026fc2;
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  &:hover {
    border: 1px solid #026fc2;
    cursor: pointer;
  }
`;

const TokenInput = styled.input`
  display: flex;
  border: none;
  background-color: white;
  width: 314px;
  height: 29px;
  outline: none;
  font-size: 25px;
`;

const InputCluster = styled.div`
  width: 519px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 5px;
`;

const ApproveandStake = styled.button`
  width: 250px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  padding: 3px;
  background-color: #e1f2ff;
  border-radius: 20px;
  border: none;
  color: #026fc2;
  font-weight: 200;
  &:hover
    background-color: #d7edfe;
    cursor: pointer;
  }
`;
const ButtonCluster = styled.div`
  width: 519px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const InfoPanel = styled.div`
  width: 520px;
  padding: 15px;
  height: 82px;
  display: flex;
  border: 1px solid #efefef;
  border-radius: 30px;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
`;

export default function Input() {
  return (
    <>
      <InfoPanel>
        Amount
        <InputCluster>
          <TokenInput></TokenInput>
          <Max>
            <span>MAX</span>
          </Max>
          <SelectedTokenInfo>
            <Image
              src="./changex-logo-round.png"
              style={{
                width: 24,
                height: 24,
                marginRight: 20,
                borderRadius: 50,
                boxShadow: "3px 3px 5px #ccc",
              }}
            />
            CHANGE
          </SelectedTokenInfo>
        </InputCluster>
      </InfoPanel>
      <ButtonCluster>
        <ApproveandStake style={{ marginRight: 30 }}> Approve </ApproveandStake>
        <ApproveandStake style={{ marginLeft: 30 }}> Stake </ApproveandStake>
      </ButtonCluster>
    </>
  );
}
