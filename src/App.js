import React from 'react';
import './App.css';
import { AppBar, Typography, Toolbar, createMuiTheme, ThemeProvider, Container, Stepper, Step, StepLabel, Button, makeStyles } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';

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

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Master Schedule", "Courses", "Off Periods"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie tempus mi.
            Sed ultrices pellentesque arcu. Curabitur venenatis semper egestas. Sed tempus gravida tempor.
            Integer consectetur commodo eros, eget laoreet purus blandit sit amet.
            Suspendisse fermentum mollis eros, rhoncus viverra tortor bibendum eu. Fusce commodo arcu sit amet varius tempus.
          </Typography>
        );
      case 1:
        return (
          <Typography gutterBottom>
            Instructions to select courses
          </Typography>
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
              <Button onClick={handleNext} variant="contained" color="primary">
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
