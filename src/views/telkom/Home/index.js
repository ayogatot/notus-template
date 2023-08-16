import React, { useEffect, useState } from "react";
import Telkom1 from "../../../assets/img/telkom2.png";
import { useHistory } from "react-router-dom";
import { ref, onValue, set } from "firebase/database";
import { database } from "config";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "config";

const value = [
  { key: "Suhu", unit: "°C", width: "15%" },
  { key: "Kelembaban", unit: "%", width: "20%" },
  { key: "H2S", unit: "ppm", width: "20%" },
  { key: "Tegangan", unit: "V", width: "15%" },
  { key: "Status", unit: "", width: "15%" },
];

function Home() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [mode, setMode] = useState(null);
  const [user, setUser] = useState({});
  const [isManual, setIsManual] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [page, setPage] = useState("home");
  const [historyNode1, setHistoryNode1] = useState([]);
  const [historyNode2, setHistoryNode2] = useState([]);

  const toAuth = () => history.push("/telkom/auth");

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    setUser(_user);

    const sensorRef = ref(database, "telkom");
    onValue(sensorRef, (snapshot) => {
      const { node1, node2, IsManual, FanStatus } = snapshot.val();
      setData({
        node1,
        node2,
      });
      setIsManual(IsManual);
      setIsOn(FanStatus);
    });

    onSnapshot(
      collection(firestore, "tahap1", "telkom", "history"),
      (docSnap) => {
        const data = [];
        docSnap.forEach(async (d) => {
          data.push({ ...d.data() });
        });

        setTimeout(() => {
          setHistoryNode1(
            data
              .filter((i) => i.type === "node1")
              .sort((a, b) => b.createdAt - a.createdAt)
          );
          setHistoryNode2(
            data
              .filter((i) => i.type === "node2")
              .sort((a, b) => b.createdAt - a.createdAt)
          );
        }, 2000);
      }
    );
  }, []);

  const setFan = ({ manual = null, fan = null }) => {
    const controlRef = ref(database, "telkom");
    set(controlRef, {
      ...data,
      IsManual: manual !== null ? manual : isManual,
      FanStatus: fan !== null ? fan : isOn,
    });
  };

  const resolveContent = () => {
    switch (page) {
      case "home":
        return (
          <div
            className="flex flex-col items-center"
            style={{ height: "85vh" }}
          >
            <div className="flex w-1/2 justify-center items-center pt-12 ">
              <div
                onClick={() =>
                  mode === "node1" ? setMode(null) : setMode("node1")
                }
                className={`rounded cursor-pointer mr-2 ${
                  mode === "node1" ? "bg-red-600" : "bg-blueGray-600"
                } text-white py-2 px-12`}
              >
                NODE 1
              </div>
              <div
                onClick={() =>
                  mode === "node2" ? setMode(null) : setMode("node2")
                }
                className={`rounded cursor-pointer ml-2 ${
                  mode === "node2" ? "bg-red-600" : "bg-blueGray-600"
                } text-white py-2 px-12`}
              >
                NODE 2
              </div>
            </div>
            <div className="flex w-1/2 justify-center items-center pt-12">
              <table style={{ width: "70%" }} className="table-auto">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th>Reading</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {value.map((i, key) => {
                    const isEven = key === 0 || key % 2 === 0;
                    return (
                      <tr style={{ background: isEven ? "#e0e0e0" : "#fff" }}>
                        <td className="text-center">{i.key}</td>
                        <td className="text-center">{`${
                          data?.[mode]?.[i.key] || ""
                        } ${i.unit}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex w-1/2 items-center pt-2">
              <div className="flex justify-end" style={{ width: "85%" }}>
                <div
                  onClick={() => setPage("history")}
                  className="rounded cursor-pointer bg-red-600 text-white py-1 px-12"
                >
                  HISTORY
                </div>
              </div>
            </div>
            <div className="flex w-1/2 justify-center items-center pt-6">
              <table style={{ width: "30%" }} className="table-auto ml-2">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th>KIPAS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "#e0e0e0" }}>
                    <td className="text-center">{isOn ? "ON" : "OFF"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex w-1/2 justify-center items-center pt-6">
              <div style={{ background: "#e0e0e0" }} className="rounded p-4">
                <p className="uppercase">Control Fan</p>
                <p
                  onClick={() => {
                    setFan({ manual: !isManual });
                    setIsManual(!isManual);
                  }}
                  className={`text-center cursor-pointer mt-2 rounded ${
                    isManual ? "text-white bg-red-600" : "bg-white "
                  }`}
                >
                  Manual
                </p>
                {isManual && (
                  <p
                    onClick={() => {
                      setFan({ fan: !isOn });
                      setIsOn(!isOn);
                    }}
                    className={` text-center mt-1 text-lg cursor-pointer font-bold text-white ${
                      isManual && isOn ? "bg-teal-500" : " bg-blueGray-600"
                    }`}
                  >
                    {isOn ? "TURN OFF" : "TURN ON"}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div
            className="flex flex-col items-center pt-2"
            style={{ height: "80vh" }}
          >
            <div
              style={{ width: "80%", height: "40%" }}
              className="flex flex-col pt-4"
            >
              <div
                style={{ width: 170, marginBottom: 12 }}
                className="rounded bg-blueGray-600 text-white py-2 px-12"
              >
                NODE 1
              </div>
              <table style={{ width: "100%" }} className="table-auto">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th style={{ width: "15%" }}>Datetime</th>
                    {value.map((i) => (
                      <th
                        style={{ width: i.width }}
                      >{`${i.key} (${i.unit})`}</th>
                    ))}
                  </tr>
                </thead>
              </table>
              <div
                style={{ height: "100%", overflowY: "scroll" }}
                className="flex flex-col"
              >
                <table style={{ width: "100%" }} className="table-auto">
                  <tbody>
                    {historyNode1.map((i, key) => {
                      const isEven = key === 0 || key % 2 === 0;
                      return (
                        <tr style={{ background: isEven ? "#e0e0e0" : "#fff" }}>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.tglText}
                          </td>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.suhu}
                          </td>
                          <td style={{ width: "20%" }} className="text-center">
                            {i.kelembaban}
                          </td>
                          <td style={{ width: "20%" }} className="text-center">
                            {i.h2s}
                          </td>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.tegangan}
                          </td>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              style={{ width: "80%", height: "40%" }}
              className="flex flex-col mt-6"
            >
              <div
                style={{ width: 170, marginBottom: 12 }}
                className="rounded bg-blueGray-600 text-white py-2 px-12"
              >
                NODE 2
              </div>
              <table style={{ width: "100%" }} className="table-auto">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th style={{ width: "15%" }}>Datetime</th>
                    {value.map((i) => (
                      <th
                        style={{ width: i.width }}
                      >{`${i.key} (${i.unit})`}</th>
                    ))}
                  </tr>
                </thead>
              </table>
              <div
                style={{ height: "100%", overflowY: "scroll" }}
                className="flex flex-col"
              >
                <table style={{ width: "100%" }} className="table-auto">
                  <tbody>
                    {historyNode2.map((i, key) => {
                      const isEven = key === 0 || key % 2 === 0;
                      return (
                        <tr style={{ background: isEven ? "#e0e0e0" : "#fff" }}>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.tglText}
                          </td>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.suhu}
                          </td>
                          <td style={{ width: "20%" }} className="text-center">
                            {i.kelembaban}
                          </td>
                          <td style={{ width: "20%" }} className="text-center">
                            {i.h2s}
                          </td>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.tegangan}
                          </td>
                          <td style={{ width: "15%" }} className="text-center">
                            {i.status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              style={{ width: 170 }}
              className="rounded cursor-pointer bg-red-600 text-center text-white py-2 mt-6"
              onClick={() => setPage("home")}
            >
              BACK
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div>
      <div
        style={{ height: "15vh", background: "#e0e0e0" }}
        className="flex justify-between items-center px-6"
      >
        <img src={Telkom1} style={{ height: 100, marginRight: 40 }} />
        <p
          style={{ fontSize: "48pt", letterSpacing: 10 }}
          className="font-bold"
        >
          RUANG BATERAI
        </p>
      </div>
      <div className="h-10 bg-red-600 flex justify-end items-center px-12">
        <i className="fas fa-user text-white mr-3"></i>
        <p className="text-white font-bold">{user?.name}</p>
        <p className="text-white font-bold px-2">|</p>
        <p
          onClick={toAuth}
          style={{ textDecoration: "underline" }}
          className="text-white font-bold cursor-pointer"
        >
          Logout
        </p>
      </div>
      {resolveContent()}
    </div>
  );
}

export default Home;
