import React, { useCallback, useEffect, useState } from "react";
import Telkom1 from "../../../assets/img/monitoring.png";
import { useHistory } from "react-router-dom";
import { ref, onValue, set } from "firebase/database";
import { database } from "config";
import { collection, where, limit, orderBy, query, getDocs } from "firebase/firestore";
import { firestore } from "config";
// import GaugeChart from 'react-gauge-chart'
import { Line } from "@ant-design/charts";
import Swal from "sweetalert2";
import moment from "moment";

const unit = {
  cost: "Rp. ",
  kwh: "",
  tegangan: "V",
  arus: "A",
  daya: "P",
  "power factor": "pF",
};

const listData = ["tegangan", "arus", "daya", "kwh", "power_factor"];

const Card = ({ title, type = "text", value, className, onClick }) => {
  const [selected, setSelected] = useState("");
  return (
    <div
      style={{ height: "150px", width: "200px", background: "#eee" }}
      className={`flex flex-col justify-center items-center rounded-lg p-2 ${className}`}
    >
      <p style={{ fontSize: "12pt" }}>{title}</p>
      {type === "button" ? (
        <div
          onClick={onClick}
          className={`cursor-pointer text-center mt-2 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150 ${
            value === "ON" ? "bg-teal-500" : "bg-red-500"
          }`}
          style={{
            fontSize: "20pt",
            color: "#fff",
            paddingRight: "12px",
            paddingLeft: "12px",
            width: "62%",
          }}
        >
          {value}
        </div>
      ) : type === "select" ? (
        <>
          <select
            className='mt-2'
            value={selected || value}
            onChange={(val) => setSelected(val.target.value)}
          >
            <option>---</option>
            <option value='250VA'>250VA</option>
            <option value='450VA'>450VA</option>
            <option value='900VA'>900VA</option>
            <option value='1300VA'>1300VA</option>
            <option value='2200VA'>2200VA</option>
          </select>
          <p
            onClick={() => onClick(selected)}
            style={{ width: "62%" }}
            className='cursor-pointer text-center mt-2 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150'
          >
            SAVE
          </p>
        </>
      ) : (
        <p
          style={{ fontSize: "20pt", color: "#000", fontWeight: "bold" }}
          className='mt-4'
        >
          {title === "Cost" ? unit.cost : ""}
          {value}
        </p>
      )}
    </div>
  );
};

const CardStatus = ({ title, value }) => {
  return (
    <div
      style={{ height: "200px", width: "200px", background: "#eee" }}
      className={`flex flex-col justify-center items-center rounded-lg p-2`}
    >
      <p style={{ fontSize: "12pt" }}>{title}: </p>
      <p style={{ fontSize: "20pt", color: "#000", fontWeight: "bold" }}>
        {Number(value || 0).toFixed(2)} {unit[title.toLowerCase()]}
      </p>
      {/* <GaugeChart id={`gauge-chart-${title}`} style={{ height: 150 }} textColor='#000' percent={0.85} animDelay={0} /> */}
    </div>
  );
};

function Home() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [historyNode, setHistoryNode] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [selectedData, setSelectedData] = useState("tegangan");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toAuth = useCallback(() => history.push("/monitoring/auth"), [history]);

  useEffect(() => {
    document.title = "Monitoring";

    const _user = JSON.parse(localStorage.getItem("user"));
    if (!_user) {
      history.push("/monitoring/auth");
    }
    setUser(_user);

    const sensorRef = ref(database, `monitoring/${_user.node}`);
    onValue(sensorRef, (snapshot) => {
      setData(snapshot.val());
      setNomorTelepon(snapshot.val().Nomor_Telepon);
    });

    getData(true, _user);
  }, [history]);

  const getData = async (initilase = true, user) => {
    const historyRef = collection(firestore, "monitoring", user.node, "history");
    let q = query(historyRef, orderBy("createdAt", "desc"), limit(20));

    if(startDate && endDate) {
      q = query(historyRef, where("createdAt", ">=", startDate), where("createdAt", "<=", endDate), orderBy("createdAt", "desc"));
    } else if (startDate) {
      q = query(historyRef, where("createdAt", ">=", startDate), orderBy("createdAt", "desc"));
    } else if (endDate) {
      q = query(historyRef, where("createdAt", "<=", endDate), orderBy("createdAt", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((d) => {
      data.push({
        ...d.data(),
        daya: Number(d.data().daya),
        arus: Number(d.data().arus),
        tegangan: Number(d.data().tegangan) || 0,
        power_factor: Number(d.data().power_factor),
        kwh: Number(d.data().kwh),
        jam: moment.unix(d.data().createdAt).format("DD MMM, HH:mm"),
      });
    });
    setHistoryNode(data);
    if(initilase) setLineData(data.slice(0, 10));
  }

  const setTombol = (tombol = true) => {
    const controlRef = ref(database, `monitoring/${user.node}`);
    if (tombol) {
      set(controlRef, {
        ...data,
        Tombol: data?.Tombol === "ON" ? "OFF" : "ON",
      });
    } else {
      Swal.fire({
        icon: "question",
        title: `Apa anda yakin mengubah Nomor Telepon menjadi ${nomorTelepon}?`,
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Berhasil update Nomor Telepon",
          });
          set(controlRef, {
            ...data,
            Nomor_Telepon: nomorTelepon,
          });
        }
      });
    }
  };

  const changeMode = (value) => {
    const controlRef = ref(database, `monitoring/${user.node}`);
    Swal.fire({
      icon: "question",
      title: `Apa anda yakin mengubah Mode menjadi ${value}?`,
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        set(controlRef, {
          ...data,
          Mode: value,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil update Mode",
        });
      }
    });
  };

  const downloaddExcel = () => {
    let url = `https://skripsi-api-azerino-yogananta-gatot-ss-projects.vercel.app/api/v1/monitoring/excel/${user.node}`;
    if(startDate && endDate) {
      url += `?start=${startDate}&end=${endDate}`;
    } else if (startDate) {
      url += `?start=${startDate}`;
    } else if (endDate) {
      url += `?end=${endDate}`;
    }

    window.open(url, "_blank");
  }

  const props = {
    data: lineData,
    xField: "jam",
    yField: selectedData,
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  const resolveCost = () => {
    let cost = 0;
    if (data?.Mode === '250VA' || data?.Mode === '450VA') {
      cost =  415 * data?.energy;
    } else if(data?.mode === '900VA') {
      cost = 1352 * data?.energy
    } else {
      cost = 1444.70 * data?.energy
    }

    return cost.toFixed(2)
  }

  const ButtonList = ({ title, onClick }) => {
    return (
      <p
        onClick={onClick}
        style={{ width: "160px" }}
        className={`cursor-pointer ml-2 mr-2 text-center mt-2  ${
          title === selectedData
            ? "bg-blueGray-800 text-white"
            : "bg-white text-blueGray-800"
        }  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150`}
      >
        {title}
      </p>
    );
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{ height: "15vh", background: "#fff" }}
        className='flex justify-between items-center px-6'
      >
        <div className='flex flex-row justify-center items-center'>
          <img alt='logo' src={Telkom1} style={{ height: 70 }} />
          <p className='mx-4' style={{ fontSize: "30px" }}>
            Smart Monitoring
          </p>
        </div>
        <p
          style={{ fontSize: "48pt", letterSpacing: 10 }}
          className='font-bold'
        >
          AREA {user?.alias}
        </p>
      </div>
      <div
        style={{ backgroundColor: "#2f73ab" }}
        className='h-10 flex justify-end items-center px-12'
      >
        <i className='fas fa-user text-white mr-3'></i>
        <p className='text-white font-bold'>{user?.name}</p>
        <p className='text-white font-bold px-2'>|</p>
        <p
          onClick={() => {
            localStorage.removeItem("user");
            toAuth();
          }}
          style={{ textDecoration: "underline" }}
          className='text-white font-bold cursor-pointer'
        >
          Logout
        </p>
      </div>

      {/* Body */}
      <div className='flex flex-row p-4'>
        <div style={{ width: "18%" }}>
          <div
            className='rounded-lg flex flex-col justify-center items-center'
            style={{ border: "1px #2f73ab solid", padding: "12px" }}
          >
            <Card
              title='Control'
              value={data?.Tombol}
              type='button'
              onClick={setTombol}
            />
            <Card
              title='Mode Pengguna Daya'
              value={data?.Mode}
              className={"mt-4"}
              type='select'
              onClick={changeMode}
            />
            <Card title='Cost' value={resolveCost()} className={"mt-4"} />
          </div>

          <div
            style={{
              border: "1px #2f73ab solid",
              padding: "12px",
              marginTop: "5%",
            }}
            className='relative w-full'
          >
            <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2'>
              Nomor Telepon
            </label>
            <div className='flex flex-row'>
              <input
                type='text'
                className='border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                placeholder='Nomor Telepon'
                onChange={(val) => setNomorTelepon(val.target.value)}
                value={nomorTelepon}
              />
              <p
                onClick={() => setTombol(false)}
                style={{ width: "40%" }}
                className='ml-2 cursor-pointer bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150'
              >
                SAVE
              </p>
            </div>
          </div>
        </div>
        <div
          className='rounded-lg flex flex-col'
          style={{
            border: "1px #2f73ab solid",
            padding: "12px",
            width: "82%",
            marginLeft: "12px",
          }}
        >
          <div className='flex flex-row justify-between'>
            <CardStatus title='KWH' value={data?.energy} />
            <CardStatus title='TEGANGAN' value={data?.voltage} />
            <CardStatus title='ARUS' value={data?.current} />
            <CardStatus title='DAYA' value={data?.power} />
            <CardStatus title='POWER FACTOR' value={data?.power_factor} />
          </div>
          <div className='mt-4'>
            <p className='text-center font-bold mb-2'>
              GRAFIK PENGGUNAAN LISTRIK
            </p>
            <div className='flex flex-row justify-center'>
              {listData.map((i) => (
                <ButtonList title={i} onClick={() => setSelectedData(i)} />
              ))}
            </div>
            <Line height={300} {...props} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className='flex flex-col m-4 rounded-sm justify-center items-center'
        style={{ border: "1px #2f73ab solid", padding: "12px" }}
      >
        <p className='p-2' style={{ fontSize: "24px", fontWeight: "bold" }}>
          HISTORY TABLE
        </p>
        <div className='flex justify-between items-center w-full m-2'>
          <div className='flex flex-row justify-end'>
            <div className='flex flex-col mr-2'>
              <label>Start Date</label>
              <input
                type='date'
                style={{
                  border: "1px solid #2f73ab",
                  borderRadius: "5px",
                  paddingTop: "10",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
                onChange={(val) =>
                  setStartDate(moment(val.target.value).startOf("day").unix())
                }
              />
            </div>
            <div className='flex flex-col ml-2'>
              <label>End Date</label>
              <input
                type='date'
                style={{
                  border: "1px solid #2f73ab",
                  borderRadius: "5px",
                  paddingTop: "10",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
                onChange={(val) =>
                  setEndDate(moment(val.target.value).endOf("day").unix())
                }
              />
            </div>
            <span
              style={{
                width: "120px",
                height: "30px",
                alignSelf: "end",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
              onClick={() => getData(false, user)}
              className='cursor-pointer text-center ml-2 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150'
            >
              Search
            </span>
          </div>

          <span
            style={{
              width: "220px",
              marginTop: "1.5%",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            onClick={() => downloaddExcel()}
            className='cursor-pointer text-center ml-2 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150'
          >
            Save to Excel
          </span>
        </div>
        <table className='table-auto w-full'>
          <thead style={{ background: "#2f73ab", color: "white" }}>
            <tr>
              <th>Waktu</th>
              <th>Mode</th>
              <th>Cost</th>
              <th>KWH</th>
              <th>Tegangan</th>
              <th>Arus</th>
              <th>Daya</th>
              <th>Power Factor</th>
            </tr>
          </thead>
          <tbody>
            {historyNode?.map((item, index) => (
              <tr
                className='text-center'
                style={{ background: index % 2 === 0 ? "#eee" : "#fff" }}
                key={index}
              >
                <td className='p-2'>
                  {moment.unix(item?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </td>
                <td className='p-2'>{item?.mode}</td>
                <td className='p-2'>
                  {"Rp. "} {item?.cost}
                </td>
                <td className='p-2'>{item?.kwh}</td>
                <td className='p-2'>
                  {item?.tegangan} {unit?.tegangan}
                </td>
                <td className='p-2'>
                  {item?.arus} {unit?.arus}
                </td>
                <td className='p-2'>
                  {item?.daya} {unit?.daya}
                </td>
                <td className='p-2'>
                  {item?.power_factor} {unit["power factor"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
