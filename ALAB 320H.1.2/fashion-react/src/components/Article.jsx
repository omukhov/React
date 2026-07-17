import styled from "styled-components";
import { Wrapper } from "./Header";

const Img = styled.img`
  width: 100%;
`;

const Date = styled.div`
  font-size: 26pt;
  font-weight: 100;
`;

const ArticleWrapper = styled.article`
  margin-bottom: 4rem;
  border-bottom: 1px solid lightgray;
  padding-bottom: 2rem;
  color: gray;
  font-size: 14pt;
  line-height: 2;

  p::first-letter {
    font-size: 5rem;
    float: left;
    line-height: 0.8;
    margin-right: 8px;
    color: lightgray;
  }
`;

const Contiues = styled.a`
  font-weight: bold;
  color: tomato;
  font-size: 14pt;
`;

const ContinuesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

function Article({ article }) {
  return (
    <Wrapper>
      <ArticleWrapper>
        <Date>{article.date}</Date>
        <h2>{article.title}</h2>
        <Img src={article.imgSrc} alt={article.imgAlt} />
        <p>{article.text}</p>
        <ContinuesWrapper>
          <Contiues href="#">Continues ...</Contiues>
        </ContinuesWrapper>
      </ArticleWrapper>
    </Wrapper>
  );
}

export default Article;
