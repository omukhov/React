import styled from "styled-components";
import employee from "../data/employees.js";
import { Img, Info, Name, Position } from "./EmployeeListItem.jsx";
import { ChevronRight } from "react-bootstrap-icons";
import Header from "../components/Header";

const EmployeePageWrapper = styled.div`
  width: 45vw;
  border: 1px solid brown;
  padding: 10px;
`;

export const LargeImg = styled(Img)`
  width: 120px;
  height: 120px;
`;

const Contact = styled.div`
  font-size: 14pt;
`;

const ContactValue = styled.div`
  color: grey;
`;

const ImageWrapper = styled.div`
  display: flex;
  border: 1px solid grey;
  width: 43vw;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
`;

const ContactWrapper = styled.div`
  border: 1px solid grey;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  width: 43vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChevronWrapper = styled.div`
  font-weight: bold;
  font-size: 16pt;
`;

function EmployeePage() {
  return (
    <EmployeePageWrapper>
      <Header isEmployeeInfo={true} />
      <ImageWrapper>
        <LargeImg src={employee[0].imageUrl} alt="avatar" />
        <Info>
          <Name>{employee[0].name}</Name>
          <Position>{employee[0].position}</Position>
        </Info>
      </ImageWrapper>
      <div>
        <ContactWrapper>
          <div>
            <Contact>Call Office</Contact>
            <ContactValue>{employee[0].officePhone}</ContactValue>
          </div>
          <ChevronWrapper>
            <ChevronRight />
          </ChevronWrapper>
        </ContactWrapper>
        <ContactWrapper>
          <div>
            <Contact>Call Mobile</Contact>
            <ContactValue>{employee[0].mobilePhone}</ContactValue>
          </div>
          <ChevronWrapper>
            <ChevronRight />
          </ChevronWrapper>
        </ContactWrapper>
        <ContactWrapper>
          <div>
            <Contact>SMS</Contact>
            <ContactValue>{employee[0].mobilePhone}</ContactValue>
          </div>
          <ChevronWrapper>
            <ChevronRight />
          </ChevronWrapper>
        </ContactWrapper>
        <ContactWrapper>
          <div>
            <Contact>Email</Contact>
            <ContactValue>{employee[0].email}</ContactValue>
          </div>
          <ChevronWrapper>
            <ChevronRight />
          </ChevronWrapper>
        </ContactWrapper>
      </div>
    </EmployeePageWrapper>
  );
}

export default EmployeePage;
