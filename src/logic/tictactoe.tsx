import { useEffect, useState } from "react";

export enum Turn {
  USER = "X",
  AI = "O",
}

const SCORE: Record<Turn, number> = {
  [Turn.AI]: 1,
  [Turn.USER]: -1,
};

function newBoard(size = 3): string[][] {
  const innerGrid = Array(size).fill("");
  return Array(size)
    .fill(null)
    .map(() => innerGrid);
}

function getAllMoves(board: string[][]) {
  const moves: [number, number][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === "") moves.push([rowIndex, colIndex]);
    });
  });
  return moves;
}

function checkWinner(board: string[][]): Turn | null | undefined {
  const winningWays = [
    // horizontal
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // vertical
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // cross
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ];

  for (let [i, j, k] of winningWays) {
    if (
      board[i[0]][i[1]] === board[j[0]][j[1]] &&
      board[j[0]][j[1]] === board[k[0]][k[1]] &&
      board[k[0]][k[1]] !== ""
    )
      return board[i[0]][i[1]] as Turn;
  }

  // if there is no empty cell then no one wins
  const empty = getAllMoves(board);
  if (!!empty.length) return undefined;

  // if all the cells are filled and no one win then it is a tie
  return null;
}

function solve(board: string[][]) {
  let bestMove: [number, number] = [0, 0];
  let bestScore = -Infinity;
  const moves = getAllMoves(board);

  for (let [i, j] of moves) {
    // simulate the move as played and get the score
    board[i][j] = Turn.AI;
    let score = minimax(board, false);
    // removing the simulated move
    board[i][j] = "";
    // the move with best score is the best move
    if (score > bestScore) {
      bestScore = score;
      bestMove = [i, j];
    }
  }
  console.log(bestMove);
  board[bestMove[0]][bestMove[1]] = Turn.AI;
  return board;
}

// minimax algorithm implementation
function minimax(board: string[][], maxPlayer: boolean) {
  // check untill there is a winner
  // if winner is found return its score
  const winner = checkWinner(board);
  if (winner === null) return 0;
  else if (winner !== undefined) return SCORE[winner];

  if (maxPlayer) {
    // maxPlayer is the AI player
    let bestScore = -Infinity;

    // simulating the move and getting the best score as above
    const moves = getAllMoves(board);
    for (let [i, j] of moves) {
      board[i][j] = Turn.AI;
      let score = minimax(board, false);
      board[i][j] = "";
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;

    // same is done for minPlayer which is the user
    // assuming the user will play optimally
    const moves = getAllMoves(board);
    for (let [i, j] of moves) {
      board[i][j] = Turn.USER;
      let score = minimax(board, true);
      board[i][j] = "";
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
}

export function useTicTacToe() {
  const [board, setBoard] = useState<string[][]>(newBoard);
  const [turn, setTurn] = useState<Turn>(Turn.USER);
  const [winner, setWinner] = useState<Turn | null>();

  useEffect(() => {
    if (turn === Turn.AI) {
      setTimeout(() => {
        const newBoard = solve(JSON.parse(JSON.stringify(board)));
        setTurn(Turn.USER);
        setBoard(newBoard);
      }, 2000);
    }
  }, [board, turn]);

  useEffect(() => {
    const newWinner = checkWinner(board);
    setWinner(newWinner);
  }, [board]);

  const onCellClick = (rowIndex: number, colIndex: number) => {
    if (turn === Turn.AI) return;
    if (winner !== undefined) {
      resetGame();
      return;
    }
    setBoard((oldBoard) =>
      oldBoard.map((row, i) =>
        i === rowIndex
          ? row.map((col, j) => (j === colIndex ? turn : col))
          : row
      )
    );
    setTurn((oldTurn) => (oldTurn === Turn.USER ? Turn.AI : Turn.USER));
  };

  const resetGame = () => {
    setTurn(Turn.USER);
    setWinner(undefined);
    setBoard(() => newBoard());
  };

  return {
    board,
    winner,
    onCellClick,
  };
}
