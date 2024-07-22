import { useEffect } from "react";

import LogoImage from "assets/img/logoV3.png";
import MaintenanceImage from "assets/img/maintenance.svg";
import IcLauncher from "assets/img/ic_launcher.png";

const Maintenance = () => {
  useEffect(() => {
    document.title = "IBFNEX - Maintenance";
    let link =
      document.querySelector('link[rel="shortcut icon"]') ||
      document.querySelector('link[rel="icon"]');

    if (!link) {
      link = document.createElement("link");
      link.id = "favicon";
      link.rel = "shortcut icon";
      document.head.appendChild(link);
    }

    console.log(link)

    link.href = IcLauncher;
  }, []);

  return (
    <div
      style={{ height: "100vh" }}
      className='flex flex-col justify-center items-center'
    >
      <img src={LogoImage} style={{ width: "120px", paddingBottom: "24px" }} />
      <img src={MaintenanceImage} />
      <h1 style={{ fontSize: "24pt", fontWeight: "bold", marginTop: "24px" }}>
        Under Maintenance
      </h1>
      <h2>The module you are looking for is currently under maintenance</h2>
    </div>
  );
};

export default Maintenance;
