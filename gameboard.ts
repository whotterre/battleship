import {Ship, coordsToArr} from './shipModels/ship'
type CoOrdinates = [string, number]

class GameBoard {
    board: Array<Ship | null>
    missedAttacks: Set<number>
    surroundSpaces: Set<number>

    constructor() {
        this.board = new Array<Ship | null>(100).fill(null)
        this.missedAttacks = new Set<number>()
        this.surroundSpaces = new Set<number>()
    }

    computeSurroundSpaces(ship: Ship) {
        /* In battleship, each ship must have occupy a square space
        In other words, for each element of a ship column vector, S1,there must be 
        a space of 1 square with the squares of another ship column vector, Sn in the board matrix
        This function will determine and return the set of coordinates representing the surrounding spaces of a ship
      
        */
        for (let point of ship.points) {
            const coord = coordsToArr(point)

            const backs: number = coord - 10
            const fronts: number = coord + 10
            const bottoms: number = coord + 1
            const tops: number = coord - 1
            const leftDiagonal: number = coord - 11
            const rightDiagonal: number = coord + 11
            if (backs >= 0 && backs < 100) this.surroundSpaces.add(backs)
            if (fronts >= 0 && fronts < 100) this.surroundSpaces.add(fronts);
            if (bottoms % 10 !== 0) this.surroundSpaces.add(bottoms);
            if (tops % 10 !== 9) this.surroundSpaces.add(tops);
            if (bottoms % 10 !== 0) this.surroundSpaces.add(bottoms);
            if (leftDiagonal >= 0 && leftDiagonal < 100) this.surroundSpaces.add(leftDiagonal)
            if (rightDiagonal >= 0 && rightDiagonal < 100) this.surroundSpaces.add(rightDiagonal)


        }

    }
    checkPlacable(ship: Ship): boolean {
        /* Check if a ship can be placed on the board */
        for (let point of ship.points) {
            const coord = coordsToArr(point)
            if (coord >= 0 && coord <= 99 && !this.surroundSpaces.has(coord)) {
                return true
            }

        }
        return false
    }

    placeShip(ship: Ship) {
        if (this.checkPlacable(ship)) {
            for (let point of ship.points) {
                const coord = coordsToArr(point)
                // add marker here o
                this.board[coord] = ship
                this.surroundSpaces.add(coord)

            }
            return true
        }
        else {
            console.error("Couldn't place ship on board")
            return false
        }
    }

    recieveAttack(shot:CoOrdinates) {
        /* Logic to recieve an attack 
        Can either have a hit or miss as an outcome
        
        */
        const coord = coordsToArr(shot)

        if(this.board[coord] !== null){
            this.board[coord]?.hit()
            console.log("Hit!")
            if(this.board[coord]?.sunk){
                console.log("Ship sunk")
            }
            return true
        } else {
            this.missedAttacks.add(coord)
            console.log("Miss!")
            return false
        }
       
    
    
    }
    /* Add method to check if all ships have sunk or not here */
}

export default GameBoard