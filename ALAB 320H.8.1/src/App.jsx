import { useEffect, useState } from "react";
import getStarships from "./services/sw-api";
import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: #000;
  color: white;
`;

export const Title = styled.h1`
  text-align: center;
  color: #ffe81f;
  font-size: 48px;
  letter-spacing: 5px;
  margin-bottom: 40px;

  text-shadow:
    0 0 10px #ffe81f,
    0 0 20px #ffe81f;
`;

export const StarshipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const StarshipCard = styled.div`
  height: 180px;

  background: #1b8f3a;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  border-radius: 12px;

  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;

  box-shadow:
    0 0 10px #1b8f3a,
    0 0 20px #1b8f3a,
    inset 0 0 15px rgba(255, 255, 255, 0.2);

  border: 2px solid #2fff68;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);

    background: #24c957;

    box-shadow:
      0 0 20px #2fff68,
      0 0 40px #2fff68;

    cursor: pointer;
  }
`;

function App() {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStarships();
      console.log(data);
      setStarships(data.results);
    };

    fetchData();
  }, []);

  return (
    <AppWrapper>
      <Title>STAR WARS STARSHIPS</Title>
      <StarshipsGrid>
        {starships.map((ship) => (
          <StarshipCard key={ship.name}>{ship.name}</StarshipCard>
        ))}
      </StarshipsGrid>
    </AppWrapper>
  );
}

export default App;
