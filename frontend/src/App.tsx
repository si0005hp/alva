import React from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import auth0 from "./auth0/auth0-util";
import NavBar from "./components/NavBar";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/callback" render={auth0.callback} />
          <Route exact path="/main" component={Main} />
          <Redirect to="/main" />;
        </Switch>
      </Router>
    </div>
  );
};

export default App;
