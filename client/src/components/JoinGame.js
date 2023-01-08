import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="p-5">
          <div className="mx-auto h-100 align-middle  d-flex flex-column w-25 ">
            <h4 className="mb-3 pt-5 pb-3 text-white">Create Game</h4>
            <input
              placeholder="Username of rival..."
              className="form-control mb-3"
              onChange={(event) => {
                setRivalUsername(event.target.value);
              }}
            />
            <button onClick={createChannel} className="btn btn-primary mt-3">
              {" "}
              Join/Start Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default JoinGame;
