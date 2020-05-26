import React from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(2),
  },
  headerCell: {
    minWidth: 100,
  },
}));

export default function ResultsTable(props) {
  const classes = useStyles();
  const headers = Array(8).fill(0).map((v, i) => "Period " + (i + 1));

  const cellRep = (period) => {
    switch (period.length) {
      case 0:
        return "-"
      case 1:
        return period[0].name
      case 2:
        const s1 = (period[0] && period[0].name) || "-";
        const s2 = (period[1] && period[1].name) || "-";
        return s1 + ", " + s2;
      default:
        return "Invalid length of period array!"
    }
  };

  return (
    <div className="ResultsTable">
      <Typography gutterBottom>
        Generated {props.schedules.length} schedules in {props.timeTaken / 1000}s
      </Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((heading) => (
                <TableCell key={heading} className={classes.headerCell}>{heading}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.schedules.map((schedule) => (
              <TableRow>
                {schedule.map((period) => (
                  <TableCell>
                    {cellRep(period)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
