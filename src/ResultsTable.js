import React from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Collapse, makeStyles, IconButton } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowDown } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(2),
  },
  periodHeaderCell: {
    minWidth: 100,
  },
  noBorderBottom: {
    borderBottom: "unset",
  },
  collapsableCell: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  detailTable: {
    marginBottom: theme.spacing(2),
  },
}));

const basicCellRep = (period) => {
  switch (period.length) {
    case 0:
      return "---"
    case 1:
      return period[0].name
    case 2:
      const s1 = (period[0] && period[0].name) || "---";
      const s2 = (period[1] && period[1].name) || "---";
      return s1 + ", " + s2;
    default:
      return "Invalid length of period array!"
  }
};

const expandedCellRep = (course) => {
  if (course === null) {
    return "---"
  } else {
    return course.name + " - " + course.teacher + " - " + course.room
  }
};

function ExpandedRow(props) {
  const expandPeriod = (periodCourses) => {
    let s1 = "---", s2 = "---";
    if (periodCourses.length === 1) {
      s1 = expandedCellRep(periodCourses[0]);
      s2 = s1;
    } else if (periodCourses.length === 2) {
      s1 = expandedCellRep(periodCourses[0]);
      s2 = expandedCellRep(periodCourses[1]);
    }
    return (
      <React.Fragment>
        <TableCell>{s1}</TableCell>
        <TableCell>{s2}</TableCell>
      </React.Fragment>
    )
  };

  return (
    <TableRow>
      <TableCell variant="head">Period {props.periodNum + 1}</TableCell>
      {expandPeriod(props.periodCourses)}
    </TableRow>
  )
}

function ResultsRow(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <React.Fragment>
      <TableRow onClick={toggleOpen}>
        <TableCell className={classes.noBorderBottom}>
          <IconButton size="small" onClick={toggleOpen}>
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>
        {props.schedule.map((period) => (
          <TableCell className={classes.noBorderBottom}>
            {basicCellRep(period)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className={classes.collapsableCell}></TableCell>
        <TableCell className={classes.collapsableCell} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="h6" gutterBottom>
              Schedule {props.number}/{props.total}
            </Typography>
            <Table className={classes.detailTable} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Semester 1</TableCell>
                  <TableCell>Semester 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.schedule.map((periodCourses, periodNum) => (
                  <ExpandedRow periodCourses={periodCourses} periodNum={periodNum} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
        <TableCell className={classes.collapsableCell}></TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function ResultsTable(props) {
  const classes = useStyles();
  const headers = Array(8).fill(0).map((v, i) => "Period " + (i + 1));

  return (
    <div className="ResultsTable">
      <Typography gutterBottom>
        Generated {props.schedules.length} schedules in {props.timeTaken / 1000}s
      </Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {headers.map((heading) => (
                <TableCell key={heading} className={classes.periodHeaderCell}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.schedules.map((schedule, index) => (
              <ResultsRow schedule={schedule} number={index + 1} total={props.schedules.length} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
