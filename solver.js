//	Explanation of Algorithm used:

//	Objective: Goes through each empty slot and fills it with a number from 1-9.
//	(Generative Recursion): We are essentially creating a tree with all the possible 
//							empty values that a slot can hold.
	

//	This will obviously be really memory intensive on the machine, which is why
//	certain searching algorithms and methods will be necessary. 


//	We will first need a validator to verify that the number in place is valid with
//	with the rules of the game i.e. The number inputted cannot be the same as a number
//	that already exists on the same row, column or square. This is necessary to greatly 
//	decrease the number of possibilities available, thus making it less memory intensive. 

//	Back-tracking is used to admit our mistakes :), once a dead-end is reached, which is very
//	likely, the algorithm can go back to a point where its slots are still valid and explore
//	other possiblities. 


//	null value is used to represent an empty space on the board 

const b = null 

//	2D js array to represent a sudoku board

const board = [
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b]
]

//	Test board 
const t_board = [
	[1, b, b, b, b, b, b, b, 3],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, 8, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, b],
	[b, 3, b, b, b, b, b, b, b],
	[b, b, b, b, b, b, b, b, 9]
]

// Impossible to solve, contradiction
const Impossible = [
	[1, 2, 3, 4, 5, 6, 7, 8, b],
	[b, b, b, b, b, b, b, b, 2],
	[b, b, b, b, b, b, b, b, 3],
	[b, b, b, b, b, b, b, b, 4],
	[b, b, b, b, b, b, b, b, 5],
	[b, b, b, b, b, b, b, b, 6],
	[b, b, b, b, b, b, b, b, 7],
	[b, b, b, b, b, b, b, b, 8],
	[b, b, b, b, b, b, b, b, 9]
]


const Impossible = [
	[1, 2, 3, 4, 5, 6, 7, 8, b],
	[b, b, b, b, b, b, b, b, 1],
	[b, b, b, b, b, b, b, b, 2],
	[b, b, b, b, b, b, b, b, 3],
	[b, b, b, b, b, b, b, b, 4],
	[b, b, b, b, b, b, b, b, 5],
	[b, b, b, b, b, b, b, b, 6],
	[b, b, b, b, b, b, b, b, 7],
	[b, b, b, b, b, b, b, b, 8]
]


function solve(board) {

	if (solved(board)) {
		return board
	} else {
		const possiblities = nextBoards(boards)
		const validBoards = keepOnlyValid(possibilities)
		return searchForSolution(validBoards)
	}
}

function searchForSolution(boards) {
	if (boards.length < 1) {
		return false
	} else {
		var first = boards.shift()
		const tryPath = solve(first)

		if(tryPath != false) {
			return tryPath
		} else {
			searchForSolution(boards)
		}
	}
}
