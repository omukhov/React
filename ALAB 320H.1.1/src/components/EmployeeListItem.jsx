import styled from "styled-components";

const EmployeeListItemWrapper = styled.div`
  width: 41vw;
  display: flex;
  border: 1px solid red;
  margin: 10px;
`;

export const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 20px;
`;

export const Name = styled.div`
  font-size: 14pt;
  font-weight: bold;
`;

export const Position = styled.div`
  color: grey;
`;

function EmployeeListItem({ name, position, imageUrl }) {
  return (
    <EmployeeListItemWrapper>
      <Img src={imageUrl} alt="avatar" />
      <Info>
        <Name>{name}</Name>
        <Position>{position}</Position>
      </Info>
    </EmployeeListItemWrapper>
  );
}

export default EmployeeListItem;
