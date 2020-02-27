import React, { useContext, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createStyles,
  Theme,
  darken
} from "@material-ui/core/styles";
import { GlobalContext } from "GlobalState";
import { fetchWinners, sendWinner } from "Api";
import { Winner, Roles } from "types";

import Controls from "./Controls";
import PlayArea from "./PlayArea";
import Message from "components/Message";
import Winners from "./Winners";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: "100vh",
      padding: "0px 25px",
      background: darken("#fff", 0.06)
    },
    gameContainer: {
      minHeight: "100%"
    }
  })
);

const Game: React.FC<{}> = () => {
  const {
    initializeWinners,
    isGameFinished,
    userPoints,
    AIPoints,
    playerName,
    isGameStarted
  } = useContext(GlobalContext);
  const classes = useStyles();

  const [text, setText] = useState<string>("Pick your rank");

  const postWinner = async (winner: string) => {
    try {
      const winners = await sendWinner(winner);
      initializeWinners(winners);
    } catch (error) {
      console.error("Post Error", error);
    }
  };

  const initWinners = async () => {
    const data: Winner[] = await fetchWinners();
    initializeWinners(data);
  };

  useEffect(() => {
    initWinners();
  }, []);

  useEffect(() => {
    if (isGameStarted) setText("Go Go Go");
  }, [isGameStarted]);

  useEffect(() => {
    if (isGameFinished) {
      let winner: Roles | string;
      if (AIPoints > userPoints) {
        setText("Smart & Modern AI won");
        winner = Roles.ai;
      } else {
        setText("Suddenly you won. Congrats");
        winner = `${playerName} ${Roles.user}`;
      }
      postWinner(winner);
    }
  }, [isGameFinished]);

  return (
    <Grid container item lg={12} className={classes.container}>
      <Grid item lg={6}>
        <Controls />
        <Message message={text} />
        <Winners />
      </Grid>
      <Grid item lg={6}>
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.gameContainer}
        >
          <PlayArea />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Game;
