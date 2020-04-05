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
        Welcome to ScheduleStacker JS! To begin, please select the year of the 
        Cherry Creek High School Master Schedule to generate schedules for.
        Then press "Next". Hopefully this tool is helpful! I haven't finished it yet
        and this is the development version and I'm writing some filler text.
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
