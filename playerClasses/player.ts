import GameBoard from "../gameboard"
class Player {
    name: string
    board: GameBoard
    score: number

    constructor(name: string){
        this.name = name,
        this.board = new GameBoard(),
        this.score = 0
    }  
    incrementScore (){
        this.score += 1
    }
}
export default Player