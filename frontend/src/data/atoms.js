import { atom } from "recoil";

export const counterState = atom({
  key: "counterState",
  default: 1,
});

export const heatingState = atom({
  key: "heatingState",
  default: false,
});

export const coolingState = atom({
  key: "coolingState",
  default: false,
});
