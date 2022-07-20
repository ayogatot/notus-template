import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import ReniNavbar from "components/Navbars/ReniNavbar.js";
import HeaderReni from "components/Headers/HeaderReni.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/reni/Dashboard";

export default function Admin() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        <ReniNavbar />
        {/* Header */}
        <HeaderReni />
        <div className="mx-auto w-full -m-24">
          <Switch>
            <Route path="/reni/dashboard" exact component={Dashboard} />
            <Redirect from="/reni" to="/reni/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
