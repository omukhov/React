import styled from "styled-components";
import { Wrapper } from "./Header";
import Nav from "./Nav";

const footerMenu = [
  "Home",
  "Women's",
  "Men's",
  "On The Street",
  "The Catwalk",
  "AdWatch",
  "About",
  "Tips",
];

const Copyright = styled.div`
  font-size: 14pt;
  color: gray;
  margin-top: 50px;
`;

function Footer() {
  return (
    <Wrapper>
      <Nav menu={footerMenu} isHeader={false} />
      <Copyright>&copy; 2013 Valet Industries, Inc</Copyright>
    </Wrapper>
  );
}

export default Footer;
