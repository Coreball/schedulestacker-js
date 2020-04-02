import React from 'react';
import './App.css';
import { AppBar, Typography, Toolbar, createMuiTheme, ThemeProvider, Container } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue,
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              SCHEDULESTACKER JS
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          hello world?
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
