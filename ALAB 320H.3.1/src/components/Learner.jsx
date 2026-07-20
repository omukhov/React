import styled from "styled-components";
import Score from "./Score";

const ListItemWrapper = styled.li`
  margin-top: 20px;
  font-family: "Courier New", Courier, monospace;
  font-size: 16pt;
`;

const ScoreListWrapper = styled.ul`
  list-style-type: none;
`;

function Learner({ learner }) {
  return (
    <ListItemWrapper key={learner.name}>
      <div>
        <b>Name:</b> {learner.name}
      </div>
      <p>
        <b>BIO:</b> {learner.bio}
      </p>
      <ScoreListWrapper>
        {learner.scores.map((score) => (
          <Score score={score} />
        ))}
      </ScoreListWrapper>
    </ListItemWrapper>
  );
}

export default Learner;
