import styled from "styled-components";
import Learner from "./Learner";

const ListWrapper = styled.ul`
  list-style-type: none;
`;

function List({ learners }) {
  return (
    <ListWrapper>
      {learners.map((learner) => (
        <Learner learner={learner} />
      ))}
    </ListWrapper>
  );
}

export default List;
