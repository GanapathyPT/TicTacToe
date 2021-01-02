import { useState, Fragment } from "react"
import solve, { USER, AI, TIE, checkWinner } from "./algorithm"

import Moon from "./moon.png"
import Sun from "./sun.png"

const getGrid = () => {
	const innerGrid = Array(3).fill().map(() => null)
	return Array(3).fill().map(() => innerGrid)
}

export default function Game({ dark, setDark }) {
	const [grid, setGrid] = useState(getGrid)
	const [dis, setDis] = useState(false)

	const handleClick = (i, j) => {
		// dont do anything if button is disabled
		// or if there is a winner or the chosen cell is not empty
		if (!dis && !checkWinner(grid) && !grid[i][j]) {
			// copying the grid (not mutating the state)
			const gridCopy = grid.map(row => [...row])
			gridCopy[i][j] = USER

			setDis(true)
			setGrid(gridCopy)

			if (checkWinner(gridCopy))
				setDis(false)

			// AI player simulation 
			// let the AI think for a second
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
			"X" : grid[i][j] === AI ?
			"O" : null
		}
		</button>

	const winner = checkWinner(grid)

	return (
		<div className="game">
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
					<small onClick={() => window.location.reload()} className="center">click here to continue</small>
				</Fragment>
			}
			<div onClick={setDark} className="dark__switch">
				<img width="100%" height="100%" src={dark ? Sun : Moon} alt="Switch Mode" />
			</div>
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
