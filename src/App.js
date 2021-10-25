import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/Home";
import Currencydetailpage from "./Components/CurrencyDetailpage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/Currencydetailpage/:id"
          component={Currencydetailpage}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
