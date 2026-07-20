import styled from "styled-components";
import SearchBar from "./SearchBar";
import EmployeeList from "./EmployeeList";
import Header from "../components/Header";
import { useState } from "react";
import employees from "../data/employees";

const HomePageWrapper = styled.div`
  width: 45vw;
  margin-right: 10px;
  border: 1px solid orange;
  padding: 10px;
`;

function HomePage() {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <HomePageWrapper>
      <Header isEmployeeInfo={false} />
      <SearchBar search={search} setSearch={setSearch} />
      <EmployeeList employees={filteredEmployees} />
    </HomePageWrapper>
  );
}

export default HomePage;
