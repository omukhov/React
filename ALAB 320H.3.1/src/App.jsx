import { useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import List from "./components/List";

const learners = [
  {
    name: "Cait Yomorta",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus placeat nostrum explicabo? Voluptatibus expedita saepe officia optio, commodi totam ratione laudantium ipsum porro molestias, quasi nulla minus vitae laboriosam corrupti Delectus inventore explicabo est odit incidunt rem a recusandae eum pariatur. Aperiam doloremque blanditiis harum voluptate animi fugit beatae asperiores quo, dignissimos sed illum veniam eum accusantium nulla quod voluptatum",
    scores: [
      {
        date: "2018-02-08",
        score: 77,
      },
      {
        date: "2018-04-22",
        score: 92,
      },
      {
        date: "2018-09-15",
        score: 68,
      },
    ],
  },
  {
    name: "Holly Baird",
    bio: "Eum molestiae explicabo deserunt, maiores quod eaque omnis tenetur vero ducimus, magnam autem! Quia facere quaerat eum repudiandae dolorum eligendi iure quae. Eos id possimus accusantium, earum animi modi hic.",
    scores: [
      {
        date: "2018-12-14",
        score: 88,
      },
      {
        date: "2019-01-09",
        score: 79,
      },
      {
        date: "2019-02-23",
        score: 91,
      },
      {
        date: "2019-03-01",
        score: 95,
      },
    ],
  },
  {
    name: "Wes Mungia",
    bio: "Repudiandae veritatis recusandae quidem tenetur impedit, numquam incidunt enim, adipisci id cupiditate asperiores nam perferendis. Facere odit laborum ipsum autem repellendus natus eius doloremque ullam perferendis. Enim repellendus ut veniam?",
    scores: [
      {
        date: "2018-10-11",
        score: 62,
      },
      {
        date: "2018-11-24",
        score: 74,
      },
      {
        date: "2018-12-19",
        score: 85,
      },
    ],
  },
];

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`;

const gutter = "15px";

export const Container = styled.div`
  width: 100%;
  padding-right: ${gutter};
  padding-left: ${gutter};
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }

  ${(props) =>
    props.fluid &&
    css`
      max-width: 100%;
    `}
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${gutter};
  margin-left: -${gutter};
`;

export const Col = styled.div`
  position: relative;
  width: 100%;
  padding-right: ${gutter};
  padding-left: ${gutter};

  ${(props) =>
    props.size
      ? css`
          flex: 0 0 ${(props.size / 12) * 100}%;
          max-width: ${(props.size / 12) * 100}%;
        `
      : css`
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        `}
`;

function App() {
  const [learnerData, setLearnerData] = useState(learners);
  return (
    <Container>
      <Row>
        <Col size={10}>
          <List learners={learnerData} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
