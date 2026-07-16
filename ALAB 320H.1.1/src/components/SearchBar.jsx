import styled from "styled-components";

const SearchBarInput = styled.input`
  border-radius: 6px;
  border: 2px solid grey;
  height: 30px;
  width: 41vw;
`;
const SearchBarWrapper = styled.div`
  width: 43vw;
  height: 50px;
  border: 1px solid green;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchBar() {
  return (
    <SearchBarWrapper>
      <SearchBarInput />
    </SearchBarWrapper>
  );
}

export default SearchBar;
