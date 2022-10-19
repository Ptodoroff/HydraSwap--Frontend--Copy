import styled from "styled-components";
import Image from "./Image";

interface DarkProps {
  darkMode: boolean;
  dark?: any;
}

const SelectedTokenInfo = styled.button<DarkProps>`
  height: 32px;
  width: 145px;
  border-radius: 12px;
  border: none;
  margin-bottom: 0px;
  font-size: 20px;
  display: flex;
  background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};

  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Max = styled.button<DarkProps>`
  width: 40px;
  height: 28px;
  background-color: ${(props) => (props.darkMode ? "#1d2e48" : "#e1f2ff")};
  border-radius: 8px;
  border: ${(props) => (props.darkMode ? `0.5px solid #026fc2` : `none`)};
  color: #026fc2;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  &:hover {
    border: 1px solid #026fc2;
    cursor: pointer;
  }
`;

const TokenInput = styled.input<DarkProps>`
  display: flex;
  border: #212429;
  background-color: ${(props) => (props.darkMode ? "#212429" : "white")};
  width: 314px;
  height: 29px;
  outline: none;
  font-size: 25px;
`;

const InputCluster = styled.div<DarkProps>`
  width: 480px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 5px;
`;

export const ApproveandStake = styled.button<DarkProps>`
  width: 250px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  padding: 3px;
  background-color: ${(props) => (props.darkMode ? "#1d2e48" : "#e1f2ff")};
  border-radius: 20px;
  border: none  ;
  color: #026fc2;
  font-weight: 500;
  &:hover
    background-color: #d7edfe;
    cursor: pointer;
  }
`;
export const ButtonCluster = styled.div`
  width: 519px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const InfoPanel = styled.div<DarkProps>`
  width: 490px;
  padding: 15px;
  padding-bottom: 2px;
  padding-top: 5px;
  height: 80px;
  display: flex;
  margin-bottom: 5px;
  border: ${(props) =>
    props.darkMode ? `0.5px solid grey` : `1px solid #efefef`};
  border-radius: 25px;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

export default function Input({ dark, darkMode }: DarkProps) {
  return (
    <>
      <InfoPanel darkMode={darkMode}>
        <span
          style={{
            fontSize: "14px",
            fontWeight: 550,
            color: darkMode ? "white" : "black",
          }}
        >
          Amount
        </span>
        <InputCluster darkMode={darkMode}>
          <TokenInput darkMode={darkMode}></TokenInput>
          <Max darkMode={darkMode}>
            <span>MAX</span>
          </Max>
          <SelectedTokenInfo darkMode={darkMode}>
            <Image
              darkMode={darkMode}
              src="./changex-logo-round.png"
              style={{
                width: 24,
                height: 24,
                marginRight: 20,
                marginLeft: 20,
                borderRadius: 50,
                boxShadow: darkMode ? "none" : "3px 3px 5px #ccc",
              }}
            />
            CHANGE
          </SelectedTokenInfo>
        </InputCluster>
      </InfoPanel>
    </>
  );
}
