import {useState} from "react";

export default function Player({initialName, symbol, isActive, onSaveName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        setIsEditing( editing => !editing);

        if (isEditing) {
            onSaveName(symbol, playerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let buttonCaption = 'Edit'

    if (isEditing) {
        editablePlayerName = <input type='text' required value={playerName} onChange={handleChange} />;
        buttonCaption = "Save"
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    )
}