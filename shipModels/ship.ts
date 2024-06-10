type CoOrdinates = [string, number]
type ShipPoints = Array<CoOrdinates> | []
enum rowValues {
    "A" = 0,
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"
}
function coordsToArr(coord: CoOrdinates):number{
    /*
    Converts 2D co-ordinates to an array index value 
    Returns computed index
    */
    const rowComponent:string = coord[0]
    const arrIndex = rowValues[rowComponent] * 10 + coord[1]
    return arrIndex
}
class Ship {
    length: number
    points: ShipPoints
    hits: number
    sunk: boolean
    

    constructor(length: number, points: ShipPoints = []){
        this.length = length
        this.points = points
        this.hits = 0
        this.sunk = false
        
    }
    hit(){
        /*Logic to hit a ship */
        this.hits += 1
       
    }
    isSunk(){
        /* Sets the ship has been damaged to be sunk */
        if(this.hits >= this.length){
            this.sunk = true
        }
    }
    coordsToArr(coord: CoOrdinates){
        /*
        Converts 2D co-ordinates to an array index value 
        Returns computed index
        */
        const rowComponent:string = coord[0]
        return rowValues[rowComponent] * 10 + coord[1]
    }
}
export { Ship, coordsToArr, rowValues }