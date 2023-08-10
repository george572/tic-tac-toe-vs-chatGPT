import { winCombinations } from "@/constants/WinCombinations";

// by convention, composable function names start with "use"
  export const UseRoundResult = (player: string | undefined, pickedCells: string[]) => {
    let roundResult: string | null = null;
    if (player && pickedCells) {
    if (winCombinations.some(item => JSON.stringify(item) === JSON.stringify(pickedCells))) {
      if ( player === 'user') {
        roundResult = 'User Wins';
      } else {
        roundResult = ' Gpt Wins';
      }
    }
    }
    return  { roundResult } ;
  };