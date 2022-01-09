import { Board } from "./component/Board";
import { useTicTacToe } from "./logic/tictactoe";

function App() {
  const { board, winner, onCellClick } = useTicTacToe();

  return (
    <div className="container">
      <Board board={board} onCellClick={onCellClick} winner={winner} />
    </div>
  );
}

export default App;
