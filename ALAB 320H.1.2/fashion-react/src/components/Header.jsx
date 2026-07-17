import styled from "styled-components";
import Nav from "./Nav";

export const Wrapper = styled.header`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const headerMenu = [
  "Women's",
  "On The Street",
  "The Catwalk",
  "AdWatch",
  "About",
];

const H1Wrapper = styled.h1`
  color: tomato;
`;

function Header() {
  return (
    <Wrapper>
      <H1Wrapper>Sartre's List</H1Wrapper>
      <h2>Better-Dressed People</h2>
      <Nav menu={headerMenu} isHeader={true} />
    </Wrapper>
  );
}

export default Header;
