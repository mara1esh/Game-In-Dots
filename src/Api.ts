import axios, { AxiosResponse } from "axios";
import { Winner } from "types";
import { parseJSON } from "helpers/gameSettings";

axios.defaults.baseURL = "https://starnavi-frontend-test-task.herokuapp.com";

export const fetchGameSettings = async () => {
  console.log("Fetching settings ...");

  try {
    const response: AxiosResponse<JSON> = await axios.get("/game-settings");
    console.log(response.data);

    return parseJSON(response.data);
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export const fetchWinners = async (): Promise<Winner[] | []> => {
  console.log("Fetching winners ...");

  try {
    const response = await axios.get("/winners");
    const data: Winner[] = response.data;
    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export const sendWinner = async (winner: string): Promise<Winner[] | []> => {
  console.log("Sending data to endpoint ...");

  const payload: Winner = {
    date: new Date().toLocaleString(),
    winner
  };

  try {
    const response = await axios.post("/winners", payload);
    const data: Winner[] = response.data;
    return data;
  } catch (error) {
    console.error("err", error);
    return [];
  }
};
