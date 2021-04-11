import React from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  }
}));

export default function ChooseMS(props) {
  const classes = useStyles();

  return (
    <div className="ChooseMS">
      <Typography gutterBottom>
        Welcome to schedulestacker-js!
      </Typography>
      <Typography gutterBottom>
        This is the web version of the original ScheduleStacker project.
        To learn more, please see the information button at the top right.
      </Typography>
      <Typography gutterBottom>
        Please select the year of the Cherry Creek High School Master Schedule
        to generate schedules for, then press "Next". A computer is advised for the
        best experience. Hopefully you find this tool helpful!
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="year">Year</InputLabel>
        <Select labelId="year" id="year" value={props.value} onChange={props.onChange}>
          {props.options.map((url) => (
            <MenuItem key={url.year} value={url}>{url.year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
