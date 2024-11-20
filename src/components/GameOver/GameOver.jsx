export default function GameOver({winner, onRematch}) {
    return(
        <div id='game-over'>
            <h2>GAME OVER</h2>
            {winner && <p>{winner} ha vinto!</p>}
            {!winner && <p>Pareggio!</p>}
            <p><button onClick={onRematch}>Nuova partita</button></p>
        </div>
    )
}