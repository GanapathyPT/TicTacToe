import styles from "./BoardRow.module.css";

interface Props {
  row: string[];
  rowIndex: number;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

function BoardRow({ row, rowIndex, onCellClick }: Props) {
  return (
    <div className={styles.boardRow}>
      {row.map((content, colIndex) => (
        <div
          className={styles.boardCell}
          onClick={() => onCellClick(rowIndex, colIndex)}
        >
          {content}
        </div>
      ))}
    </div>
  );
}

export { BoardRow };
