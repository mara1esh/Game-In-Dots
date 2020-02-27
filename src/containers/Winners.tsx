import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WinnersTable from "components/WinnersTable";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      paddingRight: 20
    }
  })
);

const Winners: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item>
        <Typography variant="h6">Winners</Typography>
      </Grid>
      <WinnersTable />
    </Grid>
  );
};
export default Winners;
