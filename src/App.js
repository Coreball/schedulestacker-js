import React from 'react';
import './App.css';
import { AppBar, Typography, Toolbar, createMuiTheme, ThemeProvider, Container, Stepper, Step, StepLabel, Button, makeStyles, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Link } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { deepPurple, purple } from '@material-ui/core/colors';
import ChooseMS from './ChooseMS';
import ChooseCourses from './ChooseCourses';
import ChooseOffPeriods from './ChooseOffPeriods';
import ChooseTeachers from './ChooseTeachers';
import ResultsTable from './ResultsTable';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: purple,
  }
})

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  buttonWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(4),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  nextButtonWrapper: {
    position: 'relative',
  },
  nextButtonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

const urls = [
  {
    year: "2021-2022",
    url: "https://raw.githubusercontent.com/Coreball/schedulestacker-data/master/json/MasterSchedule20212022.json"
  },
  {
    year: "2020-2021",
    url: "https://raw.githubusercontent.com/Coreball/schedulestacker-data/master/json/MasterSchedule20202021.json"
  },
  {
    year: "2019-2020",
    url: "https://raw.githubusercontent.com/Coreball/schedulestacker-data/master/json/MasterSchedule20192020.json"
  },
  {
    year: "2018-2019",
    url: "https://raw.githubusercontent.com/Coreball/schedulestacker-data/master/json/MasterSchedule20182019.json"
  },
  {
    year: "2017-2018",
    url: "https://raw.githubusercontent.com/Coreball/schedulestacker-data/master/json/MasterSchedule20172018.json"
  },
]

function App() {
  const classes = useStyles();
  const steps = ["Master Schedule", "Courses", "Off Periods", "Teachers"];
  const [loading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedMS, setSelectedMS] = React.useState('');
  const [allCourses, setAllCourses] = React.useState('');
  const [newCourse, setNewCourse] = React.useState();
  const [wantedCourses, setWantedCourses] = React.useState([]);
  const [wantedOffPeriods, setWantedOffPeriods] = React.useState(Array(8).fill(false));
  const [availableTeachers, setAvailableTeachers] = React.useState('');
  const [doneSchedules, setDoneSchedules] = React.useState([]);
  const [progressCount, setProgressCount] = React.useState(0);
  const [timeTakenMillis, setTimeTakenMillis] = React.useState(0);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const loadMS = async (ms) => {
    console.log("Loading MS for " + ms.year);
    setLoading(true);
    const response = await fetch(ms.url);
    const data = await response.json();
    console.log(data);
    setAllCourses(data);
    setWantedCourses([]);
    setWantedOffPeriods(Array(8).fill(false));
    setAvailableTeachers('');
    setLoading(false);
    setActiveStep(1);
  };

  const wantsOffPeriod = (period) => wantedOffPeriods[period - 1];

  const availableTeachersAtLeastOneFor = (course) => {
    return Object.keys(availableTeachers[course]).some((teacher) => availableTeachers[course][teacher]);
  };

  const availableTeachersAtLeastOneAll = () => {
    return Object.keys(availableTeachers).every((course) => availableTeachersAtLeastOneFor(course));
  };

  const prepareAvailableTeachers = () => {
    let courses = {};
    wantedCourses.forEach((course) => {
      let teachers = {};
      Object.keys(course).forEach((sem) => {
        if (sem === 'year' || sem === 's1' || sem === 's2') {
          Object.keys(course[sem]).forEach((period) => {
            course[sem][period].forEach((instance) => {
              if (!(instance.teacher in teachers) && !wantsOffPeriod(instance.period)) {
                teachers[instance.teacher] = (availableTeachers[course.name]
                  && availableTeachers[course.name][instance.teacher]) || false; // Do previous or unselected
              }
            })
          })
        }
      })
      courses[course.name] = teachers;
    })
    console.log(courses);
    setAvailableTeachers(courses);
    // This checks for wanted off period conflicts, but doesn't work with double-period courses
  };

  const generate = async (courses, offs, teachers) => {
    setLoading(true);
    const startTime = Date.now();
    console.log("Starting schedule generation");
    const instance = worker();
    instance.onmessage = (e) => setProgressCount(e.data); // Show user how many found
    const results = await instance.generateSchedules(courses, offs, teachers);
    console.log("Finished schedule generation");
    console.log(results);
    setDoneSchedules(results);
    const timeTaken = Date.now() - startTime;
    console.log("Time taken: " + timeTaken);
    setTimeTakenMillis(timeTaken);
    setLoading(false);
    setActiveStep(4);
    window.scrollTo(0, 0);
  };

  const isNextDisabled = () => {
    return loading
      || (activeStep === 0 && !selectedMS)
      || (activeStep === 1 && wantedCourses.length < 1)
      || (activeStep === 3 && !availableTeachersAtLeastOneAll());
  };

  const handleNext = () => {
    if (activeStep === 0) {
      loadMS(selectedMS)
    } else if (activeStep === 2) {
      prepareAvailableTeachers();
      setActiveStep(3);
    } else if (activeStep === 3) {
      generate(wantedCourses, wantedOffPeriods, availableTeachers);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSelectedMSChange = (event) => {
    setSelectedMS(event.target.value);
  };

  const handleNewCourseChange = (event, value) => {
    setNewCourse(value);
  };

  const handleNewCourseAdd = () => {
    console.log(newCourse);
    if (newCourse != null && !wantedCourses.some((course) => course.name === newCourse.name)) {
      setWantedCourses(wantedCourses.concat(newCourse));
    }
  };

  const handleWantedCourseDelete = (remove) => {
    console.log(remove);
    setWantedCourses(wantedCourses.filter((course) => course.name !== remove.name));
  };

  const handleWantedOffPeriodChange = (event) => {
    let offPeriods = [...wantedOffPeriods];
    offPeriods[event.target.name] = event.target.checked;
    setWantedOffPeriods(offPeriods);
  };

  const handleAvailableTeacherChange = (event, course) => {
    setAvailableTeachers({
      ...availableTeachers,
      [course]: {
        ...availableTeachers[course],
        [event.target.name]: event.target.checked
      }
    });
  };

  const handleAboutOpen = () => setAboutOpen(true);

  const handleAboutClose = () => setAboutOpen(false);

  const getContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <ChooseMS options={urls} value={selectedMS} onChange={handleSelectedMSChange} />
        );
      case 1:
        return (
          <ChooseCourses options={allCourses} onChange={handleNewCourseChange} onAdd={handleNewCourseAdd}
            wanted={wantedCourses} onDelete={handleWantedCourseDelete} />
        );
      case 2:
        return (
          <ChooseOffPeriods options={wantedOffPeriods} onChange={handleWantedOffPeriodChange} />
        );
      case 3:
        return (
          <ChooseTeachers options={availableTeachers} onChange={handleAvailableTeacherChange}
            error={availableTeachersAtLeastOneFor} open={loading} count={progressCount} />
        );
      case 4:
        return (
          <ResultsTable schedules={doneSchedules} timeTaken={timeTakenMillis} />
        )
      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              SCHEDULESTACKER-JS
            </Typography>
            <IconButton color="inherit">
              <Info onClick={handleAboutOpen} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog open={aboutOpen} onClose={handleAboutClose}>
          <DialogTitle>About</DialogTitle>
          <DialogContent>
            <DialogContentText>
              schedulestacker-js is the successor to the original ScheduleStacker project,
              a tool I created in 2018 to generate schedules for Cherry Creek High School.
              By rewriting the Java application as a web app, schedulestacker-js aims
              to be easier to use for a greater number of people.
              You are encouraged to contribute! Create issues, fork, make pull requests.
              This project is meant to be collaborative and I can't work on it forever.
            </DialogContentText>
            <DialogContentText>
              <Link href="https://github.com/Coreball/schedulestacker-js" color="secondary">schedulestacker-js GitHub Repository</Link><br />
              <Link href="https://coreball.github.io/ScheduleStacker" color="secondary">Original ScheduleStacker Website</Link><br />
              <Link href="https://github.com/Coreball/schedulestacker-data" color="secondary">Data Repository</Link>
            </DialogContentText>
            <DialogContentText>
              Originally built by Changyuan Lin @Coreball.<br />
              changyuan.lin@outlook.com (formerly clin3@cherrycreekschools.org)
            </DialogContentText>
            <DialogContentText>
              Thanks for checking it out!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAboutClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Container maxWidth="sm">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
        <Container maxWidth={activeStep === steps.length ? "xl" : "sm"}>
          {getContent(activeStep)}
        </Container>
        <Container maxWidth="sm">
          <div className={classes.buttonWrapper}>
            <Button className={classes.backButton} disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === steps.length ? (
              <Button onClick={handleReset}>
                Start Over
              </Button>
            ) : (
                <div className={classes.nextButtonWrapper}>
                  <Button disabled={isNextDisabled()} onClick={handleNext} variant="contained" color="primary">
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  {loading && <CircularProgress className={classes.nextButtonProgress} size={24} />}
                </div>
              )
            }
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
