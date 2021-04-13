import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "App";
import SavedPage from "pages/SavedPage/SavedPage";
import SubredditPage from "pages/SubredditPage/SubredditPage";
interface Props {}
const AppRouter: React.FC<Props> = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/saved" exact component={SavedPage} />
        <Route path="/r/:id" exact component={SubredditPage} />

      </Switch>
    </Router>
  );
};
export default AppRouter;
