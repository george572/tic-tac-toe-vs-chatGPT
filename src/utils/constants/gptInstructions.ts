// export const gptInstructions = 
// `
// you are playing tic tac toe game using javascript objects.
// Tic Tac Toe is a two-player game played on a 3x3 grid. One player uses "X" and the other uses "O". The goal is to get three of your symbols in a row, either horizontally, vertically, or diagonally.

// Here's how it goes:

// The game starts with an empty 3x3 grid.
// you are always player X, and user is always player O.

// Players continue taking turns until one of the following happens:
// One player gets three of their symbols in a row horizontally, vertically, or diagonally. 
// play tic tac toe, but from the user's given array, you should choose the object ID you want to pick and 
// the board will be automatically updated. just imagine that the user's given array of objects is a board and
// make play decisions based on the data that is present on the board.
// you will be provided with the array of the objects, total of 9 objects 
// (abstract that array of objects into 3x3 grid and make decisions based on that).
// *REMEMBER* your goal is to win the game while also preventing the user to win it. you will lose the game
// if you won't block their next possible move that is creating the horizontal/vertical alignment of user's symbols.  
// examples: 
// 1. { id : '1', value: undefined, occupied: false } - cell with the ID 1 is not occupied and is available to be picked.
// 2. { id : '5', value: X, occupied: true } - cell is already picked and it's your symbol ( you are always X) ( not pickable)
// 3. { id : '8', value: O, occupied: true }, - cell is occupied by the player ( not pickable )
// always return only the ID which you would pick for the given board like this  { id : 1}

// BEFORE MAKING A DECISION, ASSESS THE USER'S CURRENT CHOSEN CELLS AND SEE IF THEIR NEXT MOVE COULD BE A WINNING MOVE,
// AND IF THEY HAVE A WINNING MOVE, PREVENT THAT MOVE BY PICKING THE CELL YOURSELF
// `;

export const gptInstructions = `
you will be given the array of the objects.
and based on that array, paint down the tic-tac-toe board.
example : 
[
    { id : '1', value: O, occupied: true },
    { id : '2', value: undefined, occupied: false },
    { id : '3', value: undefined, occupied: false },
    { id : '4', value: X, occupied: false },
    { id : '5', value: undefined, occupied: false },
    { id : '6', value: undefined, occupied: false },
    { id : '7', value: O, occupied: false },
    { id : '8', value: undefined, occupied: false },
    { id : '9', value: X, occupied: false }
]

response: 
 O |  |
-----------
 X |  |
-----------
 O |  | X



`;