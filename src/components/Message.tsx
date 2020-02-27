import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

type Prop = {
  message: string;
};

const Message: React.FC<Prop> = ({ message }) => {
  return (
    <Grid container item lg={12}>
      <Box mt={1} mb={3.5} margin="auto">
        <Typography variant="h6">{message || ""}</Typography>
      </Box>
    </Grid>
  );
};

export default Message;
