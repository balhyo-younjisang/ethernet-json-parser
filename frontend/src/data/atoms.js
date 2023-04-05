import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const counterState = atom({
  key: "counterState",
  default: 1,
  effects_UNSTABLE: [persistAtom]
});

export const heatingState = atom({
  key: "heatingState",
  default: false,
});

export const coolingState = atom({
  key: "coolingState",
  default: false,
});

export const portState = atom({
  key: "portState",
  default: "",
});
