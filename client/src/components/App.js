import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RegisterScreen from "./RegisterScreen";
import LogInScreen from "./LogInScreen";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/login" component={LogInScreen} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Redirect from="*" to="/register" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
