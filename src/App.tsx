import { styled } from "styled-components";
import "./App.css";
import Header from "./components/Header";
import AsteriodsTab from "./components/tab/AsteroidTab";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <AsteriodsTab />
    </AppContainer>
  );
}

export default App;
