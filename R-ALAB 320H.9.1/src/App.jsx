import TodoList from "./pages/todoList";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body{
    font-family: Inter, sans-serif;
    background:#eef2f7;
    color:#1f2937;
  }

  button{
    font-family:inherit;
  }

  input{
    font-family:inherit;
  }
`;

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
