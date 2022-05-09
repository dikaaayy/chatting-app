import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "",
    image_url: "",
  },
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
