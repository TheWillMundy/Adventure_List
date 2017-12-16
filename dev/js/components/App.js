import React from 'react';
import AdventureList from '../containers/adventures-list';
import MyAdventures from '../containers/myadventures';
import Login from '../containers/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <div>
      <h2>List of Adventures</h2>
      <AdventureList />
      <h2>Your Adventures</h2>
      <MyAdventures />
      <h2>Login Here</h2>
      <Login />
    </div>
  </MuiThemeProvider>
)

export default App;
