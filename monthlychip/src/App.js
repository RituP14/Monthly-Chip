import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/MonthlyItemsList";
import ItemList from "./components/ItemList";
import "./scss/main.scss";

function App() {
  return (
    <Router>
      <div className="navBar-list">
        <h1>Monthly Planner</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li>
              <Link to={"/itemList"} className="nav-link">
                ItemList
              </Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/itemList" component={ItemList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
