import "./App.css";

import Header from "./components/Header/Header";
import Board from "./containers/Board/Board";

function App() {
  return (
    <div className="App">
      <Header title="Trello Board"></Header>
      <Board></Board>
    </div>
  );
}

export default App;
