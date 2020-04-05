import React from 'react';
import { Typography, FormControl, FormGroup, FormLabel, FormControlLabel, Button, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

export default function ChooseOffPeriods(props) {
  const classes = useStyles();

  return (
    <div className="ChooseOffPeriods">
      <Typography gutterBottom>
        Instructions for choosing off periods. Clarify that the selected will definitely
        exist in the generated schedules, but if schedule has space more off periods will be
        added wherever they are available.
      </Typography>
      <FormControl className={classes.formControl}>
        <FormLabel>Off Periods Required</FormLabel>
        <FormGroup>
          {props.options.map((checked, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={checked} onChange={props.onChange} name={'' + index} />}
              label={"Period " + (index + 1)}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
