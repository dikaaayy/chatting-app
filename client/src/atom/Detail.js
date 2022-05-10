import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "",
    image_url: "",
    user_room: "1",
  },
});

export const currentUserState = atom({
  key: "currentUserState",
  default: [],
});

export const messageListState = atom({
  key: "messageListState",
  default: [],
});

export const userMessageState = atom({
  key: "userMessageState",
  default: "",
});
