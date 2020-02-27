import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "GlobalState";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Cell from "./Cell";

const Square: React.FC<{}> = () => {
  const {
    gameField,
    checkWinner,
    currentSetting,
    setCurrentElement,
    isGameStarted,
    setGameStatus,
    isGameFinished
  } = useContext(GlobalContext);

  const [playing, setPlay] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isGameFinished && isGameStarted) setGameStatus();

    if (!isGameStarted && isGameFinished) if (playing) clearInterval(playing);

    if (isGameStarted && !isGameFinished) {
      const intervalId = setInterval(() => {
        checkWinner();
        setCurrentElement();
      }, currentSetting?.delay || 2000);
      setPlay(intervalId);
    }
  }, [isGameStarted, isGameFinished]);

  const createTable = () =>
    gameField.map((row: any, index: number) => (
      <TableRow key={index}>
        {row.map((value: any, idx: number) => (
          <Cell
            key={idx}
            cellProps={{ rowIndex: index, columnIndex: idx, value }}
          />
        ))}
      </TableRow>
    ));

  return (
    <Grid>
      <Table>
        <TableBody>{createTable()}</TableBody>
      </Table>
    </Grid>
  );
};

export default Square;
