import { winCombinations } from "@/constants/WinCombinations";

// by convention, composable function names start with "use"
  export const UseRoundResult = (player: string | undefined, pickedCells: string[], totalPickedCells: Cell[]) => {
    let roundResult: string | null = null;
    let winningCells: string[] | null = null;
    if (player && pickedCells) {
    if (winCombinations.some(item => JSON.stringify(item) === JSON.stringify(pickedCells) || item.every(value => pickedCells.includes(value)))) {
      winningCells = winCombinations.filter(item => JSON.stringify(item) === JSON.stringify(pickedCells) || item.every(value => pickedCells.includes(value)))[0];
      // console.log(winningCells, winCombinations.filter(item => JSON.stringify(item) === JSON.stringify(pickedCells) || item.every(value => pickedCells.includes(value))));
      if ( player === 'user') {
        roundResult = 'User Wins';
      } else {
        roundResult = 'Gpt Wins';
      }
    } else {
      if (totalPickedCells && totalPickedCells.every(item => item.occupied)) {
        roundResult = 'Tie';
      }
    }
    }
    return  { roundResult, winningCells } ;
  };