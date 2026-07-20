import styled from "styled-components";
import EmployeeListItem from "./EmployeeListItem";

const EmployeeListWrapper = styled.div`
  width: 43vw;
  border: 1px solid purple;
  margin: 0 auto;
`;

function EmployeeList({ employees }) {
  return (
    <EmployeeListWrapper>
      {employees.map((employee) => (
        <EmployeeListItem
          key={employee.id}
          name={employee.name}
          position={employee.position}
          imageUrl={employee.imageUrl}
        />
      ))}
    </EmployeeListWrapper>
  );
}

export default EmployeeList;
