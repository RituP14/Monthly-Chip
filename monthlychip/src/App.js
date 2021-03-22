import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import itemList from "./components/MonthlyItemsList";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="navBar-list">
        <div className="header">
          <h1>Monthly Planner</h1>
          <hr className="mt-0" />
        </div>
        <Switch>
          <Route exact path="/" component={itemList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
