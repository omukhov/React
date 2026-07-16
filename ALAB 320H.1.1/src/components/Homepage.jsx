import styled from "styled-components";
import SearchBar from "./SearchBar";
import EmployeeList from "./EmployeeList";
import Header from "../components/Header";

const HomePageWrapper = styled.div`
  width: 45vw;
  margin-right: 10px;
  border: 1px solid orange;
  padding: 10px;
`;

function HomePage() {
  return (
    <HomePageWrapper>
      <Header isEmployeeInfo={false} />
      <SearchBar />
      <EmployeeList />
    </HomePageWrapper>
  );
}

export default HomePage;
