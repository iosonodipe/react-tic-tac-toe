import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";

import {WINNING_COMBINATIONS} from "./winning-combinations.js";

import {useState} from "react";
import GameOver from "./components/GameOver/GameOver.jsx";

const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}


function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O'
    return currentPlayer
}

function deriveWinner(gameBoard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol]
        }
    }
    return winner;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAMEBOARD.map(innerArr => [...innerArr])]

    for (const turn of gameTurns) {
        //destrutturo gli oggetti contenuti in turn
        const {square, player} = turn;
        const {row, col} = square
        //aggiorno la board con il simbolo del player
        gameBoard[row][col] = player
    }

    return gameBoard
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const isDraw = gameTurns.length === 9 && !winner

    function handleChangeName(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns(prevGameTurns => {
            const prevActivePlayer = deriveActivePlayer(prevGameTurns)

            const updatedGameTurns = [{
                square: {row: rowIndex, col: colIndex},
                player: prevActivePlayer
            }, ...prevGameTurns]

            return updatedGameTurns;
        })
    }

    function handleRematch() {
        setGameTurns([])
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'}
                            onSaveName={handleChangeName}/>
                    <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'}
                            onSaveName={handleChangeName}/>
                </ol>
                {(winner || isDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
