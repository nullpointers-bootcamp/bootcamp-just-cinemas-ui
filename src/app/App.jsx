import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import configureStore from "./store";
import createHistory from "history/createBrowserHistory";
import Header from "../header";
import Home from "./pages/Home";
import Footer from "../footer";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import { Switch, Route } from "react-router-dom";

const browserHistory = createHistory();

const store = configureStore(browserHistory);

const Routes = () => (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={AboutUs} path="/about-us" />
    <Route component={TermsAndConditions} path="/terms-and-conditions" />
  </Switch>
);

const Main = () => (
  <div className="container">
    <Header />
    <Routes />
    <Footer />
  </div>
);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

export default App;
