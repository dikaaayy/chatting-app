import { atom } from "recoil";

export const userNameState = atom({
  key: "userNameState",
  default: "",
});

export const userRoomState = atom({
  key: "userRoomState",
  default: "1",
});

export const messageListState = atom({
  key: "messageListState",
  default: [],
});

export const userMessageState = atom({
  key: "userMessageState",
  default: "",
});
