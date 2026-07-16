import { ChevronLeft } from "react-bootstrap-icons";
import styled from "styled-components";

const HeaderWrapper = styled.div``;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: center;
  width: 43vw;
  height: 60px;
  align-items: center;
  font-size: 16pt;
  border: 1px solid blue;
  margin: 0 auto;
`;

const HeaderRight = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 43vw;
  height: 60px;
  font-size: 16pt;
  border: 1px solid blue;
  margin: 0 auto;
`;

function Header({ isEmployeeInfo }) {
  return (
    <HeaderWrapper>
      {isEmployeeInfo ? (
        <HeaderRight>
          <ChevronLeft />
          <div>Employee</div>
        </HeaderRight>
      ) : (
        <HeaderLeft>Employee Directory</HeaderLeft>
      )}
    </HeaderWrapper>
  );
}

export default Header;
