export const UseWhoStarts = () => {
    const players = ['user', 'gpt'];
    let currentTurn: number | null = 0; 
    let startingPlayer: string | undefined = undefined;
    let currentActivePlayer: string | undefined = undefined;
    const determineWhoStarts = () => {
        startingPlayer = players[Math.floor(Math.random()*players.length)];
        currentTurn = players.indexOf(startingPlayer);
        currentActivePlayer = startingPlayer;
        return {
            startingPlayer,
            currentTurn,
            currentActivePlayer
        };
    };

    return {
        determineWhoStarts
    };
  };