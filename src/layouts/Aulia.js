import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AuliaNavbar from "components/Navbars/AuliaNavbar.js";
import Sidebar from "components/Sidebar/AuliaSidebar.js";
import HeaderAulia from "components/Headers/HeaderAulia";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

// import Dashboard from "views/admin/Dashboard.js";
import PH from "views/aulia/PH";
import Suhu from "views/aulia/Suhu";
import Intensitas from "views/aulia/Intensitas";

export default function Aulia() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AuliaNavbar />
        {/* Header */}
        <HeaderAulia />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            {/* <Route path="/aulia/dashboard" exact component={Dashboard} /> */}
            <Route path="/aulia/grafik-A" exact component={PH} />
            <Route path="/aulia/grafik-B" exact component={Suhu} />
            <Route path="/aulia/grafik-C" exact component={Intensitas} />
            <Redirect from="/aulia" to="/aulia/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
