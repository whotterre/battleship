import GameBoard from "../gameboard";
import Player from "./player";
import { coordsToArr, rowValues } from "../shipModels/ship";
class ComputerPlayer extends Player {
    constructor() {
        super("Computer")
    }
    conjureMove(oppGameBoard: GameBoard): [string, number] {
        let x: string, y: number
        do {
            let v:number = Math.round(Math.random() * 9)
            x = rowValues[v]
            y = Math.floor(Math.random() * 10)
        } while (!oppGameBoard.missedAttacks.has(coordsToArr([x,y])))
        return [x, y]
    }
}
export default ComputerPlayer