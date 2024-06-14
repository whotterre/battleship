// I will modularize this monolithy codeeeee l8rrrr.....

import GameBoard from "../dist/gameboard.js"
import * as Ships from "../dist/shipModels/index.js"
document.addEventListener('DOMContentLoaded', () => {
    // alert("Allow autoplay on Firefox for game sounds to be enabled")
    const content = document.querySelector(".content");
    const currentScreen = 1;

    switch (currentScreen) {
        case 1:
            createFirstScreen(content);
            break;
    }
});

function createFirstScreen(content) {
    const firstAudio = new Audio("./assets/upbeat.mp3")
    firstAudio.loop = true
    firstAudio.play()
    window.Ships = Ships
    function createHelpScreen() {
        const sOne = document.querySelector(".sone_container")
        sOne.style.display = "none"
        const helpCtnr = document.createElement("div")
        helpCtnr.classList.add("helpctr")
        helpCtnr.classList.add("help_section");
        helpCtnr.innerHTML = `
            <h2>How to Play</h2>
            <p>Battleship is a guessing game where you try to sink your opponent's ships before they sink yours.</p>
            <ul>
                <li><strong>Setup:</strong> Each player places their ships on a grid. Ships can be placed horizontally or vertically, but not diagonally.</li>
                <li><strong>Gameplay:</strong> Players take turns guessing the coordinates of their opponent's ships. If a guess hits a ship, it's marked as a hit; otherwise, it's a miss.</li>
                <li><strong>Winning:</strong> The game continues until one player sinks all of their opponent's ships.</li>
            </ul>
            <h2>Controls</h2>
            <p>Use the mouse to interact with the game grid. Click on a cell to fire at that location.</p>
            <button class="close_btn"><i class="fas fa-times"></i></button>
        `;

        content.append(helpCtnr);
        content.style.width = "100%"
        content.style.textAlign = "left"
        function closeHelpScreen() {
            helpCtnr.remove();
            sOne.style.display = "block";
        }

        const closeBtn = helpCtnr.querySelector(".close_btn")
        closeBtn.addEventListener("click", closeHelpScreen)
    }

    const container = document.createElement("div");
    container.classList.add("sone_container");
    content.appendChild(container);

    const heading = document.createElement("h1");
    heading.innerText = "Battleship!";
    container.append(heading);

    const selectionMenu = document.createElement("div");
    selectionMenu.classList.add("sone_options");
    container.append(selectionMenu);

    const buttons = [
        { name: "Start Game", action: () => console.log("Start Game clicked") },
        { name: "Play as Computer", action: createComputerPlayBoardView },
        { name: "Play with Human", action: () => console.log("Play as Human clicked") },
        { name: "Help", action: createHelpScreen }
    ];

    buttons.forEach(button => {
        const playBtn = document.createElement("button");
        playBtn.classList.add("play_btn");
        playBtn.innerText = button.name;
        playBtn.addEventListener('click', button.action);
        selectionMenu.appendChild(playBtn);
    });

    function createComputerPlayBoardView() {
        /* Logic to create the human board view */
        const sOne = document.querySelector(".sone_container")
        const content = document.querySelector(".content")
        sOne.style.display = "none"
        content.style.display = "flex"
        content.style.flexDirection = "column"
        content.style.width = "100%"
        /** bcHeading is short for board config heading 
        I also want a grid kind of something
        Top - heading div
        Bottom - flexbox with two divs
        **/

        const headerDiv = document.createElement("div")
        const bottomCtr = document.createElement("div")
        const leftDiv = document.createElement("div")
        const rightDiv = document.createElement("div")

        headerDiv.classList.add("header_div")
        const heading = document.createElement("h1")
        heading.innerText = "Configure your board"
        headerDiv.append(heading)
        const status = document.createElement("h3")
        status.innerText = "Place your ships"
        headerDiv.append(status)
        bottomCtr.classList.add("bottom_ctr")
        bottomCtr.style.display = "flex"
        bottomCtr.style.gap = "40px"
        bottomCtr.append(leftDiv, rightDiv)

        content.append(headerDiv)
        content.append(bottomCtr)
        //rightDiv.append()
        const availableShips = 5
        const leftText = document.createElement("p")
        leftText.innerText = "Drag a ship to the board"
        leftDiv.append(leftText)
        leftDiv.style.borderRight = "3px solid #ccc"
        leftDiv.classList.add("left_div")
        const rightText = document.createElement("p")
        rightText.innerText = `Number of available ships : ${availableShips}`
        rightDiv.append(rightText)
        const rowHeader = document.createElement("div")
        const colHeader = document.createElement("div")
        const alignBottom = document.createElement("div")
        alignBottom.classList.add("align_bottom")
        colHeader.classList.add("col_head")
        rowHeader.classList.add("row_head")
        leftDiv.append(rowHeader)
        for (let i = 65; i < 75; i++) {
            const rowEl = document.createElement("p")
            const colEl = document.createElement("p")
            rowEl.classList.add("row_hel")
            colEl.classList.add("col_hel")
            rowEl.innerText = String.fromCharCode(i)
            colEl.innerText = Math.abs(65 - i)
            colHeader.append(colEl)
            rowHeader.append(rowEl)
        }
        const board = document.createElement("div")
        const gameBoard = new GameBoard()
        board.classList.add("config_board")
        alignBottom.append(colHeader)
        alignBottom.append(board)
        leftDiv.append(alignBottom)
        //const workingBoard = new GameBoard()
        /* Tesselate the board */
        for (let i = 0; i < gameBoard.board.length; i++) {
            const boardItem = document.createElement("div")
            boardItem.classList.add("config_square")
            board.append(boardItem)
        }
        const limits = {
            "battleship": 1,
            "carrier": 1,
            "boat": 1,
            "destroyer": 1,
            "submarine": 1
        }
        const ships = {
            destroyer: Ships.Destroyer,
            submarine: Ships.Sub,
            battleship: Ships.Battleship,
            carrier:Ships.Carrier,
            boat: Ships.Boat
        }

        const shipHolder = document.createElement("div")
        rightDiv.append(shipHolder)
        rightDiv.classList.add("right_div")
        shipHolder.classList.add("ship_holder")
        /*Create draggable ship DOM elements */

        for (const type in limits) {
            if (limits.hasOwnProperty(type)) {
                for (let i = 0; i < limits[type]; i++) {
                    const shipClass = ships[type];
                    const shipInstance = new shipClass();
                    const shipBody = document.createElement("div");
                    shipBody.classList.add("ship");
                    shipBody.dataset.type = type;
                    shipBody.draggable = true;
    
                    // Add event listeners for drag functionality
                    shipBody.addEventListener('dragstart', (event) => {
                        event.dataTransfer.setData('text/plain', event.target.dataset.type);
                        console.log(`Drag start: ${event.target.dataset.type}`);
                    });
    
                    shipBody.addEventListener('dragend', (event) => {
                        console.log(`Drag end: ${event.target.dataset.type}`);
                    });
    
                    // Create squares based on the ship's length
                    for (let j = 0; j < shipInstance.length; j++) {
                        const square = document.createElement("div");
                        square.classList.add("square");
                        shipBody.append(square);
                    }
    
                    shipHolder.append(shipBody);
                }
            }
        }
        


    }


}
