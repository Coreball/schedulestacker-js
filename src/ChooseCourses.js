import React from 'react';
import { Typography, FormControl, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  formControl: {
    maxWidth: '100%',
    width: 400,
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
          options={props.options.sort((a, b) => a.name > b.name ? 1 : -1).sort((a, b) => a.type - b.type)}
          groupBy={(option) => option.type}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Add a course" />}
        />
      </FormControl>
    </div>
  );
}