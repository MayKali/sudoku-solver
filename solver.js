/*
	Explanation of Algorithm used:

	Objective: Goes through each empty slot and fills it with a number from 1-9.
	(Generative Recursion): We are essentially creating a tree with all the possible 
							empty values that a slot can hold.
	

	This will obviously be really memory intensive on the machine, which is why
	certain searching algorithms and methods will be necessary. 


	We will first need a validator to verify that the number in place is valid with
	with the rules of the game i.e. The number inputted cannot be the same as a number
	that already exists on the same row, column or square. This is necessary to greatly 
	decrease the number of possibilities available, thus making it less memory intensive. 
	Back-tracking is used to admit our mistakes :), once a dead-end is reached, which is very
	likely, the algorithm can go back to a point where its slots are still valid and explore
	other possiblities. 
*/

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

//	Possible Test Boards
const brd1 = [
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
const brd2 = [
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


const brd3 = [
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

function initiate() {
    // null -> null
    // populate the board with whatever the user inputted
    var startingBoard = [[]]
    var j = 0
    for (var i = 1; i <= 81; i++){
        const val = document.getElementById(String(i)).value
        if (val == ""){
            startingBoard[j].push(null)
        }
        else { 
            startingBoard[j].push(Number(val))
        }
        if (i % 9 == 0 && i < 81){
            startingBoard.push([])
            j++
        }
    }
    // console.log(startingBoard)
    const inputValid = validBoard(startingBoard)
    if (!inputValid){
        inputIsInvalid()
    }
    else{
        const answer = solve(startingBoard)
        updateBoard(answer, inputValid)
    }
}


function solve(board) {

// Checks whether or not the board is solved.

	if (solved(board)) {
		return board
	} else {
		const possiblities = nextBoards(boards)
//	Gets rid of the invalid boards and implements the back-tracking search
		const validBoards = keepOnlyValid(possibilities)
		return searchForSolution(validBoards)
	}
}


function searchForSolution(boards) {

//	Checks whether there are any valid boards, if there aren't then a solution does not exist
	if (boards.length < 1) {
		return false
	} else {
		//	Back-tracking search for solution
		var first = boards.shift()
		const tryPath = solve(first)

		if(tryPath != false) {
			return tryPath
		} else {
			return searchForSolution(boards)
		}
	}
}

//	Checks whether a board is solved or not
function solved(board) {
//	A board is solved when all the slots in a given board return a non-null value. 
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9 ; j++) {
			if (board[i][j] == null) {
				return null
			}
		}
	}
	return true
}


// Generate the tree of possiblities from a sudoku board
function nextBoards(board){
	// Store all the possible sudoku boards
	var res = []
	// Returns a coordinate on the 2D plane 
	const firstEmpty = findEmptySquare(board) // <-- (y,x)
	// Generates a list of possibilities 
	if (firstEmpty != undefined){
		const y = firstEmpty[0]
		const x = firstEmpty[1]

		for (var i = 1; i <= 9; i++) {
	// Arrays are treated like objects, when an array is assigned to a variable, what is stored
	// is a reference to the array, if I change stuff in the variable, the origin is also changed
			var newBoard = [...board]
			var row = [...newBoard[y]]
			row[x] = i
			newBoard[y] = row
			res.push(newBoard)
		}
	}
	return res
}


function findEmptySquare(board) {
	// board -> [Int, Int]
	for (var i = 0; i < 9 ; i++) {
		for (var j = 0; j < 9 ; j++) {
			if (board[i][j] == null) {
				return [i, j]
			}
		}
	}
}

function keepOnlyValid(boards) {
//	If the valid method returns true, then the board will be kept, else it will be discarded
	return boards.filter((b => validBoards(b)))
}

// Checks that the rows, columns and boxes do not contain any duplicate numbers 
function validBoard(board) {
	return rowGood(board) && columnGood(board) && boxesGood(board)
}

function rowsGood(board) {
	for (var i = 0; i < 9; i++) {
		var cur = []
		for (var j = 0; j < 9; j++) {
			if (cur.includes(board[i][j])) {
				return false
			} else if (board[i][j] != null) {
				cur.push(board[i][j])
			}
		}
	}
	return true
}

function columnGood(board) {
		for (var i = 0; i < 9; i++) {
		var cur = []
		for (var j = 0; j < 9; j++) {
			if (cur.includes(board[j][ii])) {
				return false
			} else if (board[j][i] != null) {
				cur.push(board[j][i])
			}
		}
	}
	return true
}


function boxesGood(board){
	const boxCoordinates = [
	[0,0], [0,1], [0,2],
	[1,0], [1,1], [1,2],
	[2,0], [2,1], [2,2]
	]

	for (var y = 0; y < 9; y += 3) {
		for (var x = 0; x < 9; x += 3) {
			var cur = []
			for (var i = 0; i < 9; i++) {
				var coordinates = [...boxCoordinates[i]]
				coordinates[0] += y
				coordinates[1] += x
				if (cur.includes(board[coordinates[0]][coordinates[1]])) {
					return false
				} else if (board[coordinates[0]][coordinates[1]] != null) {
					cur.push((board[coordinates[0]][coordinates[1]]))
				}
	return true
}

function updateBoard(board) {
    // THIS FUNCTION WORKS.
    // Board -> null
    // update the DOM with the answer
    if (board == false){
        for (i = 1; i <= 9; i++){
            document.getElementById("row " + String(i)).innerHTML = "NO SOLUTION EXISTS TO THE GIVEN BOARD"
        }
    }
    else{
        for (var i = 1; i <= 9; i++){
            var row = ""
            for (var j = 0; j < 9; j++){
                if (row == ""){
                    row = row + String(board[i - 1][j])
                }
                else {
                    row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
                }
            }
            document.getElementById("row " + String(i)).innerHTML = row
        }
    }
}

function inputIsInvalid(){
    // starting board is invalid or puzzle is insolvable
    for (i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = "THE GIVEN BOARD IS INVALID"
    }
}
