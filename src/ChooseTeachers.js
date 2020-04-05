import React from 'react';
import { Typography, FormControl, FormGroup, FormLabel, FormControlLabel, Button, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

export default function ChooseTeachers(props) {
  const classes = useStyles();

  return (
    <div className="ChooseTeachers">
      <Typography gutterBottom>
        Instructions for choosing teachers. Clarify that the user must select
        at least one teacher for each course offered, and it's possible that no
        schedules exist for any combination.
      </Typography>
      <FormControl className={classes.formControl}>
        <FormLabel>Off Periods Required</FormLabel>
        <FormGroup>
          {props.options.map((checked, index) => (
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={props.onChange} name={index} />}
              label={"Period " + (index + 1)}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button onClick={() => console.log(props.options)}>help</Button>
    </div>
  );
}
