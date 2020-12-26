export const USER = "You"
export const AI = "AI"
export const TIE = "TIE"

const scores = {
	[USER]: -1,
	[AI]: 1,
	[TIE]: 0
}

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
	const empty = getAllMoves(grid)
	if (!!empty.length)
		return null

	return TIE
}

export default function solve(grid) {
	const gridCopy = grid.map(row => [...row])

	let bestMove
	let bestScore = -Infinity
	const moves = getAllMoves(gridCopy)

	for (let [i, j] of moves) {
		gridCopy[i][j] = AI
		let score = minimax(gridCopy, 0, false)
		gridCopy[i][j] = null
		if (score > bestScore) {
			bestScore = score
			bestMove = [i, j]
		}
	}
	console.log("bestMove", bestMove)
	const newGrid = [...grid]
	newGrid[bestMove[0]][bestMove[1]] = AI
	return newGrid
}

function minimax(grid, maxPlayer, depth) {
	const winner = checkWinner(grid)
	if (!!winner) 
		return scores[winner]

	if (maxPlayer) {
		let bestScore = -Infinity

		const moves = getAllMoves(grid)
		for (let [i, j] of moves) {
			grid[i][j] = AI
			let score = minimax(grid, false, depth + 1)
			grid[i][j] = null
			bestScore = Math.max(bestScore, score)
		}
		return bestScore
	} else {
		let bestScore = Infinity

		const moves = getAllMoves(grid)
		for (let [i, j] of moves) {
			grid[i][j] = USER
			let score = minimax(grid, true, depth + 1)
			grid[i][j] = null
			bestScore = Math.min(bestScore, score)
		}
		return bestScore
	}
}