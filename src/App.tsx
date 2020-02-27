import React from "react";
import "./App.css";
import Game from "containers/Game";
import { GlobalProvider } from "GlobalState";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <GlobalProvider>
      <Container>
        <Game />
      </Container>
    </GlobalProvider>
  );
}

export default App;
