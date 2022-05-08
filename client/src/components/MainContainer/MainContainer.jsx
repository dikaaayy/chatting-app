import TopNavigation from "../TopNavigation/TopNavigation";
// import { useState } from 'react';

import React from "react";
import BottomBar from "./BottomBar";
import Message from "./Message";

export default function MainContainer() {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list scrollbar-hide">
        <Message
          name="Ada"
          timestamp="one week ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
        <Message name="Leon" timestamp="one week ago" text={`Lorem ipsum dolor. `} />
        <Message name="Jill" timestamp="5 days ago" text={`Lorem.`} />
        <Message name="Ellie" timestamp="4 days ago" text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. `} />
        <Message
          name="Chris"
          timestamp="4 days ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
          
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
        <Message
          name="Claire"
          timestamp="2 days ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
        />
        <Message name="Albert" timestamp="22 hours ago" text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. ☺️ `} />
        <Message
          name="Rebecca"
          timestamp="3 hours ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />
        <Message
          name="H.U.N.K"
          timestamp="Just now"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
        <Message
          name="HELHO"
          timestamp="Just now"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dol   adipisicing elit. Lorem ipsum dol.`}
        />
      </div>
      <div className="flex justify-center absolute left-80 bottom-0 w-[83%] h-16 items-center bg-gradient-to-t from-gray-800 to-transparent">
        <BottomBar />
      </div>
    </div>
  );
}
