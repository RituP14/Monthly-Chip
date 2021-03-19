import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import itemList from "./components/MonthlyItemsList";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="navBar-list">
        <h1>Monthly Planner</h1>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link">
                {" "}
                List{" "}
              </Link>
            </li>
          </ul>
        </nav> */}
        <hr />
        <Switch>
          <Route exact path="/" component={itemList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
