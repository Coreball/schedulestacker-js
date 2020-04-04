import React from 'react';
import './App.css';
import { AppBar, Typography, Toolbar, createMuiTheme, ThemeProvider, Container, Stepper, Step, StepLabel, Button, makeStyles } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import ChooseMS from './ChooseMS';
import ChooseCourses from './ChooseCourses';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue,
  }
})

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
}));

const urls = [
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
  const steps = ["Master Schedule", "Courses", "Off Periods"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedMS, setSelectedMS] = React.useState('');
  const [allCourses, setAllCourses] = React.useState('');

  const loadMS = (ms) => {
    console.log("Loading MS for " + ms.year);
    fetch(ms.url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllCourses(data);
      });
  }

  const isNextDisabled = () => {
    return !selectedMS;
  }

  const handleNext = () => {
    if (activeStep === 0) {
      loadMS(selectedMS)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  const getContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <ChooseMS options={urls} value={selectedMS} onChange={handleSelectedMSChange} />
        );
      case 1:
        return (
          <ChooseCourses options={allCourses} />
        );
      case 2:
        return (
          <Typography gutterBottom>
            Instructions to select off periods
          </Typography>
        );
      default:
        return "Unknown Step";
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              SCHEDULESTACKER JS
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : (
            <div>
              {getContent(activeStep)}
              <Button className={classes.backButton} disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button disabled={isNextDisabled()} onClick={handleNext} variant="contained" color="primary">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
