import React from 'react';
import { Typography, makeStyles, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  autoButton: {
    display: 'flex',
    'align-items': 'flex-end',
    marginBottom: theme.spacing(2),
  },
  autoComplete: {
    flex: 1,
    marginRight: theme.spacing(1),
  }
}));

export default function ChooseCourses(props) {
  const classes = useStyles();
  const [rand, setRand] = React.useState();
  const onAdd = () => {
    props.onAdd();
    setRand(Math.random());  // Forces re-render and clearing of text field
  }

  return (
    <div className="ChooseCourses">
      <Typography gutterBottom>
        Instructions to select courses
      </Typography>
      <div className={classes.autoButton}>
        <Autocomplete
          className={classes.autoComplete}
          key={rand}
          id="year"
          options={props.options.sort((a, b) => a.name > b.name ? 1 : -1).sort((a, b) => a.type - b.type)}
          groupBy={(option) => option.type}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Add a course" />}
          blurOnSelect
          onChange={props.onChange}
        />
        <Button variant="contained" color="primary" onClick={onAdd}>Add</Button>
      </div>
    </div>
  );
}