import React from "react";

export default function ChannelBlock({ roomName }) {
  return (
    <div className="channel-block">
      <h5 className="channel-block-text font-sans">Room {roomName}</h5>
    </div>
  );
}
