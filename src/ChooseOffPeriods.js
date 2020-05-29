import React from 'react';
import { Typography, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';

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
        Check the boxes corresponding to the off periods you want. The generated schedules
        will always keep these periods free. If the schedule has more space for off periods
        than you have selected, the generator will add off periods whenever they are available
        and display all possible variations. If taking a class that spans two periods,
        do not select that you want an off period for the "half off period". If no offs
        are specified, all possible schedules with all off periods will be generated.
      </Typography>
      <ul>
        <li>
          <Typography gutterBottom>
            Example: want period 5 lunch and have space for a second off period but don't know where.
            Only select period 5, the program will fill in the off periods wherever and show them all.
          </Typography>
        </li>
        <li>
          <Typography gutterBottom>
            Example: want either period 4 or 6 lunch, but not both. Don't select both of them together,
            as this means you want periods 4 and 6 off in the same schedule. One way to do this is
            to select neither and the scheduler will likely fill in 4 or 6 as natural off periods.
            Alternatively, select 4 in one run of the scheduler and select 6 in the next run.
          </Typography>
        </li>
      </ul>
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
