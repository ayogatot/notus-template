import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import HudaNavbar from "components/Navbars/HudaNavbar.js";
import HeaderHuda from "components/Headers/HeaderHuda.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/huda/Dashboard.js";
import KelembabanUdara from "views/admin/KelembabanUdara";
import KelembabanTanah from "views/admin/KelembabanTanah";
import PHTanah from "views/admin/PHTanah";
import IntesitasCahaya from "views/admin/IntensitasCahaya";
import SuhuUdara from "views/admin/SuhuUdara";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";

export default function Admin() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        <HudaNavbar />
        {/* Header */}
        <HeaderHuda />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/huda/dashboard" exact component={Dashboard} />
            <Route path="/huda/kelembaban-udara" exact component={KelembabanUdara} />
            <Route path="/huda/suhu-udara" exact component={SuhuUdara} />
            <Route path="/huda/kelembaban-tanah" exact component={KelembabanTanah} />
            <Route path="/huda/ph-tanah" exact component={PHTanah} />
            <Route path="/huda/intensitas-cahaya" exact component={IntesitasCahaya} />
            <Route path="/huda/maps" exact component={Maps} />
            <Route path="/huda/settings" exact component={Settings} />
            <Route path="/huda/tables" exact component={Tables} />
            <Redirect from="/huda" to="/huda/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
