import styled from "styled-components";
import HomePage from "./components/Homepage";

import EmployeePage from "./components/EmployeePage";

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 95vw;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  padding: 20px;
`;

function App() {
  return (
    <>
      <AppWrapper>
        <HomePage />
        <EmployeePage />
      </AppWrapper>
    </>
  );
}

export default App;
