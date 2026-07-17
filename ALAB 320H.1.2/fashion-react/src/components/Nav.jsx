import styled from "styled-components";

const UlWrapper = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`;

const AHeaderWrapper = styled.a`
  color: gray;
  font-size: 14pt;
`;

const AFooterWrapper = styled.a`
  font-size: 14pt;
  color: tomato;
`;

function Nav({ menu, isHeader }) {
  return (
    <nav aria-label="Main Navigation" role="navigation">
      <UlWrapper>
        {menu.map((item) => (
          <li key={item}>
            {isHeader ? (
              <AHeaderWrapper href="#">{item}</AHeaderWrapper>
            ) : (
              <AFooterWrapper href="#">{item}</AFooterWrapper>
            )}
          </li>
        ))}
      </UlWrapper>
    </nav>
  );
}

export default Nav;
