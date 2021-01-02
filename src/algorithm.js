export const USER = "You"
export const AI = "AI"
export const TIE = "TIE"

const scores = {
	[USER]: -1,
	[AI]: 1,
	[TIE]: 0
}

// get all empty cells
const getAllMoves = (grid) => {
	const moves = []
	for (let row in grid) {
		for (let col in grid[row]) {
			if (grid[row][col] === null){
				moves.push([row, col])
			}
		}
	}

	return moves
}

export const checkWinner = (grid) => {
	const winningWays = [
		// horizontal
		[[0,0], [0,1], [0,2]],
		[[1,0], [1,1], [1,2]],
		[[2,0], [2,1], [2,2]],
		// vertical
		[[0,0], [1,0], [2,0]],
		[[0,1], [1,1], [2,1]],
		[[0,2], [1,2], [2,2]],
		// cross
		[[0,0], [1,1], [2,2]],
		[[2,0], [1,1], [0,2]],
	]

	for (let [i, j, k] of winningWays) {
		if (grid[i[0]][i[1]] === grid[j[0]][j[1]] && 
			grid[j[0]][j[1]] === grid[k[0]][k[1]] && 
			grid[k[0]][k[1]] !== null)
			return grid[i[0]][i[1]]
	}
	// if there is no empty cell then no one wins
	const empty = getAllMoves(grid)
	if (!!empty.length)
		return null

	// if all the cells are filled and no one win then it is a tie
	return TIE
}

export default function solve(grid) {
	// copying the grid for pure function
	const gridCopy = grid.map(row => [...row])

	let bestMove
	let bestScore = -Infinity
	const moves = getAllMoves(gridCopy)

	for (let [i, j] of moves) {
		// simulate the move as played and get the score
		gridCopy[i][j] = AI
		let score = minimax(gridCopy, 0, false)
		// removing the simulated move
		gridCopy[i][j] = null
		// the move with best score is the best move
		if (score > bestScore) {
			bestScore = score
			bestMove = [i, j]
		}
	}
	// cloning again for better immutability
	const newGrid = [...grid]
	newGrid[bestMove[0]][bestMove[1]] = AI
	return newGrid
}

// minimax algorithm implementation
function minimax(grid, maxPlayer) {
	// check untill there is a winner
	// if winner is found return its score
	const winner = checkWinner(grid)
	if (!!winner) 
		return scores[winner]

	if (maxPlayer) {
		// maxPlayer is the AI player
		let bestScore = -Infinity

		// simulating the move and getting the best score as above
		const moves = getAllMoves(grid)
		for (let [i, j] of moves) {
			grid[i][j] = AI
			let score = minimax(grid, false)
			grid[i][j] = null
			bestScore = Math.max(bestScore, score)
		}
		return bestScore
	} else {
		let bestScore = Infinity

		// same is done for minPlayer which is the user
		// assuming the user will play optimally
		const moves = getAllMoves(grid)
		for (let [i, j] of moves) {
			grid[i][j] = USER
			let score = minimax(grid, true)
			grid[i][j] = null
			bestScore = Math.min(bestScore, score)
		}
		return bestScore
	}
}