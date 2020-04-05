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
      <div>
        {Object.keys(props.options).map((course) => (
          <FormControl className={classes.formControl} key={course}>
            <FormLabel>{course}</FormLabel>
            <FormGroup>
              {Object.keys(props.options[course]).map((teacher) => (
                <FormControlLabel
                  key={teacher}
                  control={<Checkbox checked={props.options[course][teacher]} onChange={(event) => props.onChange(event, course)} name={teacher} />}
                  label={teacher}
                />
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </div>
      <Button onClick={() => console.log(props.options)}>help</Button>
    </div>
  );
}
