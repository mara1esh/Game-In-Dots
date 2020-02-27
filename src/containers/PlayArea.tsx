import React from "react";
import Grid from "@material-ui/core/Grid";
import Square from "components/Square";

const PlayArea: React.FC<{}> = () => {
  return (
    <Grid>
      <Square />
    </Grid>
  );
};

export default PlayArea;
