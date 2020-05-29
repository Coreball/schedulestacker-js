import React from 'react';
import { Typography, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, makeStyles, FormHelperText, Backdrop, CircularProgress } from '@material-ui/core';

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
  },
  backdrop: {
    display: 'flex',
    'flex-direction': 'column',
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  circle: {
    marginBottom: theme.spacing(1),
  }
}));

export default function ChooseTeachers(props) {
  const classes = useStyles();

  return (
    <div className="ChooseTeachers">
      <Typography gutterBottom>
        Check the boxes corresponding to teachers you want included in the generation process.
        At least one teacher must be selected for each course, and choosing two or more will
        allow either teacher to appear in each generated schedule. Keep in mind that it is possible
        no schedules exist for any given combination of teachers and courses. If you are experiencing
        performance problems and have selected many teachers, try reducing the number selected
        for each class as the number of combinations can increase very quickly.
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
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress className={classes.circle} color="inherit"/>
        <Typography>
          Generated {!isNaN(props.count) && props.count.toString()}
        </Typography>
      </Backdrop>
    </div>
  );
}
