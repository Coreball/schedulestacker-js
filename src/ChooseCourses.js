import React from 'react';
import { Typography, FormControl, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 400,
    marginBottom: theme.spacing(2)
  }
}));

export default function ChooseCourses(props) {
  const classes = useStyles();

  return (
    <div className="ChooseCourses">
      <Typography gutterBottom>
        Instructions to select courses
      </Typography>
      <FormControl className={classes.formControl}>
        <Autocomplete
          id="year"
          options={props.options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Add a course" />}
        />
      </FormControl>
    </div>
  );
}