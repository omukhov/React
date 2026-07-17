import styled from "styled-components";
import Header from "./components/Header";
import Article from "./components/Article";
import Footer from "./components/Footer";

const AppWrapper = styled.div`
  border-left: 5px solid lightgray;
  min-height: 100%;
  max-width: 1000px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 auto;
`;

const articles = [
  {
    id: 1,
    date: "11/12/20",
    title: "On the Street in Brooklyn",
    imgSrc: "./images/blog-image-1.jpg",
    imgAlt: "blog-image-1",
    text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
            cumque deleniti? Ad aperiam quis nostrum placeat quo culpa quasi
            delectus id exercitationem asperiores eum nihil qui iusto, quia esse
            excepturi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Hic molestias vel eaque pariatur odio cum dolorum quidem rerum nam
            nisi error quaerat, maxime rem corrupti esse modi distinctio culpa.
            Quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores aliquid tempore atque ducimus optio ipsam totam esse
            doloribus quod, corporis quae aliquam saepe est repudiandae unde
            doloremque nam aspernatur reprehenderit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Id autem voluptate ex rerum voluptatem
            expedita laudantium omnis vero aliquam, reprehenderit, numquam
            iusto. Ipsum dignissimos eligendi ipsam ipsa omnis mollitia fugiat.`,
  },
  {
    id: 2,
    date: "11/11/20",
    title: "Vintage in Vogue",
    imgSrc: "./images/blog-image-2.jpg",
    imgAlt: "blog-image-2",
    text: `Fashion is an important part of many people's lives. It is a way to express your personality and style. Some people enjoy following the latest trends, while others prefer to wear comfortable clothes that never go out of fashion.
Today, there are many different styles, such as casual, business, sporty, and formal. Social media and celebrities often influence what people wear. However, fashion is not only about expensive brands. You can look stylish by choosing clothes that fit well and make you feel confident.
Many people are also becoming interested in sustainable fashion. They buy second-hand clothes, recycle old items, or choose brands that care about the environment. This helps reduce waste and protects the planet.
In my opinion, the best fashion is wearing clothes that make you feel comfortable, confident, and happy. Fashion changes every year, but personal style is something that stays with you.`,
  },
];

function App() {
  return (
    <AppWrapper>
      <Header />
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
      <Footer />
    </AppWrapper>
  );
}

export default App;
