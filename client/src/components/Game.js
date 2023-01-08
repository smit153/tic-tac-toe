import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return (
      <div className="fs-1 d-flex justify-content-center text-white p-5 h-100">
        <p>Waiting for other player to join...</p>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="fs-1 text-white">
        {result.state === "won" && <div> {result.winner} Won The Game</div>}
        {result.state === "tie" && <div> Game Ties</div>}
      </div>
      <div className="gameContainer">
        <Board result={result} setResult={setResult} />
        <Window>
          <MessageList
            disableDateSeparator
            closeReactionSelectorOnClick
            hideDeletedMessages
            messageActions={["react"]}
          />
          <MessageInput noFiles />
        </Window>
      </div>
      <div className="ali">
        <button
          className="btn btn-primary m-1"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          Leave Game
        </button>
      </div>
    </div>
  );
}

export default Game;
