import { Turn } from "../logic/tictactoe";
import styles from "./Board.module.css";
import { BoardRow } from "./BoardRow";

interface Props {
  board: string[][];
  winner?: Turn | null;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

function Board({ board, winner, onCellClick }: Props) {
  return (
    <>
      <h6 className={styles.winnerText}>
        {winner !== undefined
          ? winner === null
            ? "Tie Match"
            : `${winner === Turn.AI ? "AI" : "You"} won`
          : null}
      </h6>
      <div className={styles.boardContainer}>
        {board.map((row, rowIndex) => (
          <BoardRow row={row} onCellClick={onCellClick} rowIndex={rowIndex} />
        ))}
      </div>
    </>
  );
}

export { Board };
