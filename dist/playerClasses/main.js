import GameBoard from "../gameboard";
import ComputerPlayer from "./computerPlayer";
let g = new GameBoard();
let c = new ComputerPlayer();
console.log(c.conjureMove(g));
