import Ship from './shipModels/ship'
class GameBoard {
    board: Array<Ship | null>
    missedAttacks: Set<number>
    surroundSpaces: Set<number>
    constructor(){
        this.board = new Array<Ship | null>(100).fill(null)
        this.missedAttacks = new Set<number>()
    }
    checkPlacable(item:Ship): boolean{
        // Check if the first element of each coordinate is a letter
        for (let point of item.points){
            const coord = item.coordsToArr(point)
            if(coord >= 0 && coord <= 99 && !this.surroundSpaces.has(coord)){
                return true
            }
            
        }
        return false
    }
    placeShip(){
        
    }
    recieveAttack(){

    }

}
export default GameBoard