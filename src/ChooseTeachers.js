import React from 'react';
import { Typography, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, makeStyles, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  forms: {
    display: 'flex',
    'flex-direction': 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
      <div className={classes.forms}>
        {Object.keys(props.options).map((course) => (
          <FormControl className={classes.formControl} key={course} error={!props.error(course)}>
            <FormLabel>{course}</FormLabel>
            <FormGroup>
              {Object.keys(props.options[course]).sort().map((teacher) => (
                <FormControlLabel
                  key={teacher}
                  control={<Checkbox checked={props.options[course][teacher]} onChange={(event) => props.onChange(event, course)} name={teacher} />}
                  label={teacher}
                />
              ))}
            </FormGroup>
            <FormHelperText>Select at least one teacher</FormHelperText>
          </FormControl>
        ))}
      </div>
    </div>
  );
}
