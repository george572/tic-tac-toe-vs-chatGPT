export const UseWhoStarts = () => {
    const players = ['user', 'gpt'];
    let currentTurn: number | null = 0; 
    let startingPlayer: string | null = null;
    let currentActivePlayer: string | null = null;
    startingPlayer = players[Math.floor(Math.random()*players.length)];
    currentTurn = players.indexOf(startingPlayer);
    currentActivePlayer = startingPlayer;
    return {
        startingPlayer, currentActivePlayer, currentTurn
    };
  };