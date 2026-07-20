import styled from "styled-components";

const ScoreWrapper = styled.li`
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 14pt;
`;

function Score({ score }) {
  return (
    <ScoreWrapper key={score.date}>
      <div>
        <b>Date:</b> {score.date}
      </div>
      <div>
        <b>Score:</b> {score.score}
      </div>
    </ScoreWrapper>
  );
}

export default Score;
