interface ScoreCounter {
    user: {
        wins: number = 0,
        ties : number = 0,
        loses : number = 0
    },
    gpt : {
        wins: number = 0,
        ties : number = 0,
        loses : number = 0  
    }
}