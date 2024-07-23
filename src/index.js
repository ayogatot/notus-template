import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// layouts

// import Admin from "layouts/Admin.js";
// import Auth from "layouts/Auth.js";
// import Huda from "layouts/Huda.js";
// import Aulia from "layouts/Aulia.js";
// import Reni from "layouts/Reni.js";

// // views without layouts

// import Landing from "views/Landing.js";
// import Profile from "views/Profile.js";
// import Index from "views/Index.js";

import AuthTelkom from "views/telkom/Auth";
import HomeTelkom from "views/telkom/Home";
import Maintenance from "views/Maintenance";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      {/* <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/huda" component={Huda} />
      <Route path="/aulia" component={Aulia} />
      <Route path="/reni" component={Reni} />
      <Route path="/reni" component={Reni} />
      {/* add routes without layouts */}
      {/* <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} /> */}
      {/* <Route path="/" component={Maintenance} /> */}
      <Route path="/" exact>
        <Redirect to="/monitoring/home" />
      </Route>
      <Route path="/monitoring/auth" component={AuthTelkom} />
      <Route path="/monitoring/home" component={HomeTelkom} />
      <Route path="/maintenance" component={Maintenance} />
      {/* add redirect for first page */}
      {/* <Redirect from="*" to="/" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
