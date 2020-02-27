import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "GlobalState";
import { fetchGameSettings } from "Api";
import { GameSettings } from "types";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 50
    },
    formControl: {
      minWidth: 180
    },
    buttonPlay: {
      padding: "16px 40px"
    }
  })
);

const Controls: React.FC<{}> = () => {
  const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null!);
  const [labelWidth, setLabelWidth] = useState<number>(0);

  const {
    gameSettings,
    playerName,
    currentSetting,
    isGameStarted,
    initializeState,
    selectGameSetting,
    setPlayerName,
    setGameStatus,
    pullGameField,
    resetGame,
    isGameFinished
  } = useContext(GlobalContext);

  useEffect(() => {
    setLabelWidth(inputLabel?.current?.offsetWidth);
    initSettings();
  }, []);

  useEffect(() => {
    selectGameSetting("");
  }, [isGameFinished]);

  const initSettings = async () => {
    const data: GameSettings[] = await fetchGameSettings();
    initializeState(data);
  };

  const renderOptions = () =>
    gameSettings.map((sett: GameSettings, index: number) => {
      return (
        <MenuItem key={index} value={sett.name}>
          {sett.name}
        </MenuItem>
      );
    });

  return (
    <Grid container className={classes.container}>
      <Grid item lg={4}>
        <FormControl
          variant="outlined"
          required
          className={classes.formControl}
          disabled={isGameStarted}
        >
          <InputLabel ref={inputLabel}>Pick Game Mode</InputLabel>
          <Select
            labelId="pick-game-mode"
            labelWidth={labelWidth}
            value={currentSetting?.name || ""}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              selectGameSetting(event.target.value as string);
              pullGameField();
            }}
          >
            {renderOptions()}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={4}>
        <TextField
          required
          disabled={isGameStarted}
          label="Enter Your Name"
          variant="outlined"
          value={playerName}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            setPlayerName(event.target.value as string)
          }
        />
      </Grid>
      <Grid container item lg={4} justify="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonPlay}
          disabled={!currentSetting || !playerName.length}
          onClick={() => {
            resetGame();
            setGameStatus();
          }}
        >
          {isGameFinished ? "Play Again" : "Play"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Controls;
