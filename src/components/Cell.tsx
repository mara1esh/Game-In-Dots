import React, { useContext } from "react";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Cell as ICell } from "types";
import { GlobalContext } from "GlobalState";

type Props = {
  cellProps: ICell;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallCell: {
      width: 40,
      height: 40
    },
    mediumCell: {
      width: 20,
      height: 20
    },
    largeCell: {
      width: 10,
      height: 10
    }
  })
);

const Cell: React.FC<Props> = ({ cellProps }) => {
  const {
    currentElement,
    changeColor,
    currentSetting,
    isGameFinished
  } = useContext(GlobalContext);
  const classes = useStyles();

  let bgColor;
  switch (cellProps.value) {
    case "⬜":
      bgColor = "#fff";
      break;
    case "🟩":
      bgColor = "#62ed21";
      break;
    case "🟦":
      bgColor = "#3f51b5";
      break;
    case "🟥":
      bgColor = "#ed3c21";
      break;
    default:
      break;
  }
  let cellSize;
  switch (currentSetting?.field) {
    case 15:
      cellSize = classes.largeCell;
      break;
    case 10:
      cellSize = classes.mediumCell;
      break;
    default:
      cellSize = classes.smallCell;
      break;
  }

  const handleClick = () => {
    if (
      cellProps.rowIndex === currentElement?.rowIndex &&
      cellProps.columnIndex === currentElement.columnIndex
    ) {
      changeColor(cellProps);
    }
  };

  return (
    <TableCell
      classes={{ root: cellSize }}
      style={{
        background: bgColor,
        opacity: isGameFinished ? 0.6 : 1,
        cursor: isGameFinished ? "initial" : "pointer",
        border: "2px solid grey"
      }}
      onClick={handleClick}
    />
  );
};

export default Cell;
