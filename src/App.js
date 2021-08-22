import './App.css';
import { Home } from './components/Home';
import { Redirect, Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { SearchResults } from './components/searchResults';
import { StateProvider } from './redux/store';
import tripReducer, { initialState } from './redux/reducer';
import { TripDisplay } from './components/tripDisplayPage';

function App() {
  return (
  <StateProvider initialState={initialState} reducer={tripReducer}>
    <Router history = { createBrowserHistory() }>
      <Switch>
          <Route exact path = "/home" component = {Home} />
          <Route exact path = "/search" component = {SearchResults} />
          <Route exact path = "/trip/:id" component = {TripDisplay} />
          <Redirect from = "*" to = "/home" />
      </Switch>
    </Router>
  </StateProvider>
  );
}

export default App;
