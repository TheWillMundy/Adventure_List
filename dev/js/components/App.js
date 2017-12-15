import React from 'react';
import AdventureList from '../containers/adventures-list';
import MyAdventures from '../containers/myadventures';
import Login from '../containers/login';

const App = () => (
  <div>
    <h2>List of Adventures</h2>
    <AdventureList />
    <h2>Your Adventures</h2>
    <MyAdventures />
    <h2>Login Here</h2>
    <Login />
  </div>
)

export default App;
