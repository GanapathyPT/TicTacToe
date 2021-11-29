import { Board } from "./component/Board";
import { useTicTacToe } from "./logic/tictactoe";

// function App() {
// 	const [dark, setDark] = useState(false)

// 	useEffect(() => {
// 		setDark(localStorage.getItem("dark"))
// 	}, [])

// 	useEffect(() => {
// 		if (dark) {
// 			localStorage.setItem("dark", "true")
// 		} else {
// 			localStorage.removeItem("dark")
// 		}
// 	})

//   return (
//     <div className={dark ? "center__all dark" : "center__all"}>
//     	<Game dark={dark} setDark={() => setDark(!dark)} />
//     	<div className="dark__mode" />
//     </div>
//   );
// }

function App() {
  const { board, winner, onCellClick } = useTicTacToe();

  return (
    <div className="container">
      <Board board={board} onCellClick={onCellClick} winner={winner} />
    </div>
  );
}

export default App;
