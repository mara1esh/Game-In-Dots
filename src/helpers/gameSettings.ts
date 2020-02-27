import { GameSettings } from "types";

export const parseJSON = (jsonObject: any): GameSettings[] => {
  const parsedArray: GameSettings[] = [];
  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      const element: GameSettings = jsonObject[key];
      element.name = key;
      parsedArray.push(element);
    }
  }

  return parsedArray;
};
