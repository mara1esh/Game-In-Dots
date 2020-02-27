import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WinnersTable from "components/WinnersTable";

const Winners: React.FC<{}> = () => (
  <Grid container justify="center">
    <Grid item>
      <Typography variant="h6">Winners</Typography>
    </Grid>
    <WinnersTable />
  </Grid>
);
export default Winners;
