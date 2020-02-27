export enum Roles {
  user = "💁‍♀️",
  ai = "🤖"
}

export enum CellValue {
  green = "🟩",
  blue = "🟦",
  white = "⬜",
  red = "🟥"
}

export type GameSettings = {
  name: string;
  field: number;
  delay: number;
};

export type Winner = {
  id?: number;
  winner: string;
  date: string;
};

export type Cell = {
  rowIndex: number;
  columnIndex: number;
  value?: CellValue;
};
