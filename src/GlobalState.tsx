import React, { createContext, useReducer } from "react";
import { GameSettings, Winner, Cell } from "types";

enum ActionTypes {
  initializeState = "initializeState",
  initializeWinners = "initializeWinners",
  selectGameSetting = "selectGameSetting",
  setPlayerName = "setPlayerName",
  setGameStatus = "setGameStatus",
  resetGame = "resetGame",
  pullGameField = "pullGameField",
  setCurrentElement = "setCurrentElement",
  changeColor = "changeColor",
  checkWinner = "checkWinner"
}

type State = {
  gameSettings: Array<GameSettings>;
  winners: Winner[] | [];
  currentSetting: GameSettings | undefined;
  playerName: string;
  gameField: string[][];
  isGameStarted: boolean;
  isGameFinished: boolean;
  currentElement: Cell;
  userPoints: number;
  AIPoints: number;
  initializeState: (payload: GameSettings[]) => void;
  initializeWinners: (payload: Winner[]) => void;
  selectGameSetting: (payload: string) => void;
  setPlayerName: (payload: string) => void;
  setGameStatus: () => void;
  pullGameField: () => void;
  changeColor: (payload: Cell) => void;
  setCurrentElement: () => void;
  checkWinner: () => void;
  resetGame: () => void;
};

type Action = {
  type: string;
  payload?: any;
};

export const initialValues: State = {
  gameSettings: [],
  winners: [],
  currentSetting: undefined,
  playerName: "",
  gameField: Array(5)
    .fill("⬜")
    .map(() => Array(5).fill("⬜")),
  isGameStarted: false,
  isGameFinished: false,
  userPoints: 0,
  AIPoints: 0,
  currentElement: { rowIndex: -1, columnIndex: -1 },
  initializeState: () => {},
  initializeWinners: () => {},
  selectGameSetting: () => {},
  setPlayerName: () => {},
  setGameStatus: () => {},
  pullGameField: () => {},
  changeColor: () => {},
  setCurrentElement: () => {},
  checkWinner: () => {},
  resetGame: () => {}
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.initializeState:
      return {
        ...state,
        gameSettings: action.payload
      };
    case ActionTypes.initializeWinners:
      return {
        ...state,
        winners: action.payload
      };
    case ActionTypes.selectGameSetting:
      const currentSetting = state.gameSettings.find(
        i => i.name === action.payload
      );
      return {
        ...state,
        currentSetting: currentSetting || undefined
      };
    case ActionTypes.setPlayerName:
      return {
        ...state,
        playerName: action.payload
      };
    case ActionTypes.setGameStatus:
      return {
        ...state,
        isGameStarted: !state.isGameStarted
      };
    case ActionTypes.pullGameField: {
      const selectedFieldSize = Array(state.currentSetting?.field)
        .fill("⬜")
        .map(() => Array(state.currentSetting?.field).fill("⬜"));
      return {
        ...state,
        gameField: selectedFieldSize
      };
    }
    case ActionTypes.setCurrentElement: {
      const { columnIndex, rowIndex } = state.currentElement;
      let isElementFound = false;
      let currentElement: Cell = { columnIndex: -1, rowIndex: -1 };
      let buff = state.gameField;
      let isAIWon = false;

      if (rowIndex !== -1 && state.gameField[rowIndex][columnIndex] === "🟦") {
        buff[rowIndex][columnIndex] = "🟥";
        isAIWon = true;
      }

      while (!isElementFound) {
        const randR = Math.floor(Math.random() * state.gameField.length);
        const randC = Math.floor(Math.random() * state.gameField.length);
        if (state.gameField[randR][randC] === "⬜") {
          currentElement = { rowIndex: randR, columnIndex: randC };
          buff[randR][randC] = "🟦";
          isElementFound = true;
        }
      }

      return {
        ...state,
        currentElement,
        gameField: buff,
        AIPoints: isAIWon ? state.AIPoints + 1 : state.AIPoints
      };
    }
    case ActionTypes.changeColor: {
      const { columnIndex, rowIndex } = action.payload;
      let buff = state.gameField;
      buff[rowIndex][columnIndex] = "🟩";
      return {
        ...state,
        gameField: buff,
        userPoints: state.userPoints + 1
      };
    }
    case ActionTypes.checkWinner: {
      const { gameField, userPoints, AIPoints } = state;
      const countOfGameCells = gameField.length * gameField.length;
      let isGameFinished = false;

      if (
        userPoints > countOfGameCells / 2 ||
        AIPoints > countOfGameCells / 2
      ) {
        isGameFinished = true;
        return {
          ...state,
          isGameFinished
        };
      }

      return {
        ...state
      };
    }
    case ActionTypes.resetGame:
      return {
        ...state,
        isGameStarted: false,
        isGameFinished: false,
        userPoints: 0,
        AIPoints: 0
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext(initialValues);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <GlobalContext.Provider
      value={{
        gameSettings: state.gameSettings,
        winners: state.winners,
        currentSetting: state.currentSetting,
        playerName: state.playerName,
        isGameStarted: state.isGameStarted,
        gameField: state.gameField,
        currentElement: state.currentElement,
        userPoints: state.userPoints,
        AIPoints: state.AIPoints,
        isGameFinished: state.isGameFinished,

        checkWinner: () => dispatch({ type: ActionTypes.checkWinner }),
        initializeState: (payload: GameSettings[]) =>
          dispatch({ type: ActionTypes.initializeState, payload }),
        initializeWinners: (payload: Winner[]) =>
          dispatch({ type: ActionTypes.initializeWinners, payload }),
        selectGameSetting: (payload: string) =>
          dispatch({ type: ActionTypes.selectGameSetting, payload }),
        setPlayerName: (payload: string) =>
          dispatch({ type: ActionTypes.setPlayerName, payload }),
        setGameStatus: () => dispatch({ type: ActionTypes.setGameStatus }),
        pullGameField: () => dispatch({ type: ActionTypes.pullGameField }),
        setCurrentElement: () =>
          dispatch({ type: ActionTypes.setCurrentElement }),
        changeColor: (payload: Cell) =>
          dispatch({ type: ActionTypes.changeColor, payload }),
        resetGame: () => dispatch({ type: ActionTypes.resetGame })
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
