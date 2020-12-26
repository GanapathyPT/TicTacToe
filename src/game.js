import { useState, Fragment } from "react"
import solve, { USER, AI, TIE, checkWinner } from "./algorithm"


const getGrid = () => {
	const innerGrid = Array(3).fill().map(() => null)
	return Array(3).fill().map(() => innerGrid)
}

export default function Game() {
	const [grid, setGrid] = useState(getGrid)
	const [dis, setDis] = useState(false)

	const handleClick = (i, j) => {
		if (!dis && !checkWinner(grid) && !grid[i][j]) {
			const gridCopy = grid.map(row => [...row])
			gridCopy[i][j] = USER

			setDis(true)
			setGrid(gridCopy)

			if (checkWinner(gridCopy))
				setDis(false)

			setTimeout(() => {
				if (!checkWinner(gridCopy)){
					setGrid(solve(gridCopy))
					setDis(false)
				}
			}, 1000)
		}
		else if (checkWinner(grid)) {
			window.location.reload()
		}
	}

	const Square = ({ i, j }) => 
		<button disabled={dis} className="square" onClick={() => handleClick(i, j)}>
		{
			grid[i][j] === USER ?
			"O" : grid[i][j] === AI ?
			"X" : null
		}
		</button>

	const winner = checkWinner(grid)

	return (
		<div onClick={() => {
			if (!!winner)
				window.location.reload()
		}}>
			<h1 align="center">Tic Tac Toe</h1>
			<hr className="line" />
			{
				!!winner &&
				<Fragment>
					<div className="alert">
					{
						winner === TIE ? "It's a tie" : `${winner} wins` 
					}
					</div>
					<small className="center">click here to continue</small>
				</Fragment>
			}
			{
				grid.map((row, i) => 
					<div key={i} className="d__flex">
						{
							row.map((col, j) =>
								<Square key={j} i={i} j={j} />
							)
						}
					</div>
				)
			}
		</div>
	)
}