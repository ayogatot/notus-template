import React, { useState, useEffect } from "react";
import CardStats from "components/Cards/CardStats.js";
import { ref, onValue, set } from 'firebase/database'
import { database, firestore } from "config";
import { collection, onSnapshot } from 'firebase/firestore'

import HistoryChart from "components/Cards/HudaHistory";
import CardHistoryTable from "components/Cards/CardHistoryTableHuda.js";

export default function Dashboard() {
  const [data, setData] = useState({})
  const [dataHistory, setDataHistory] = useState([])
  const [source, setSource] = useState(null)

  useEffect(() => {
    const sensorRef = ref(database, 'huda')
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setData({
        conductivity: data.conductivity,
        minyak_baik: data.minyak_baik,
        minyak_jahat: data.minyak_jahat,
        minyak_proses: data.minyak_proses,
        ph_minyak: data.ph_minyak,
        turbidity: data.turbidity,
        warna_minyak: +data.warna_minyak >= 40 ? 'Baik' : 'Jelek',
        deteksi: data.deteksi
      })
    })

    onSnapshot(collection(firestore, 'tahap1', 'huda', 'history'), docSnap => {
      let _data = []
      docSnap.forEach(doc => {
        _data.push(doc.data())
      })
      setDataHistory(_data)
    })
  }, [])

  const onClick = () => {
    const sensorRef = ref(database, 'huda/deteksi')
    set(sensorRef, !data?.deteksi)
  }

  return (
    <>
      <div className="relative mb-24 md:pt-6">
        <div className="px-4 md:px-10 w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardStats
                  statSubtitle="pH Minyak"
                  statTitle={(data?.ph_minyak || 0)}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardStats
                  statSubtitle="Conductivity"
                  statTitle={(data?.conductivity || 0) + " %"}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardStats
                  statSubtitle="Turbidity"
                  statTitle={data?.turbidity + " NTU"}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconColor="bg-yellow-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardStats
                  statSubtitle="Warna Minyak"
                  statTitle={data?.warna_minyak || "-"}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="mx-4 mt-4">
          <div style={{ width: '300px' }} className="w-full">
            <div style={{ height: '300px' }} className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      Status
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      Minyak Baik
                    </span>
                  </div>
                </div>
                <div className="flex h-full justify-center items-center">
                  <p style={{ fontSize: '40pt', marginTop: '-30px' }} className="text-blueGray-800">
                    {data?.minyak_baik}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-4">
          <div style={{ width: '300px' }} className="w-full">
            <div style={{ height: '300px' }} className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      Status
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      Minyak Jelek
                    </span>
                  </div>
                </div>
                <div className="flex h-full justify-center items-center">
                  <p style={{ fontSize: '40pt', marginTop: '-30px' }} className="text-blueGray-800">
                    {data?.minyak_jahat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-4">
          <div style={{ width: '300px' }} className="w-full">
            <div style={{ height: '300px' }} className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      Status
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      Jumlah Proses
                    </span>
                  </div>
                </div>
                <div className="flex h-full justify-center items-center">
                  <p style={{ fontSize: '40pt', marginTop: '-30px' }} className="text-blueGray-800">
                    {data?.minyak_proses}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-center justify-center">
        <p style={{ fontSize: '20pt', marginTop: '30px', fontWeight: 'bold' }}>Grafik Monitoring</p>
      </div>
      <div className="my-6 flex flex-row items-center justify-center">
        <button onClick={() => onClick()} style={data?.deteksi ? style.buttonActive : style.buttonReset}>{data?.deteksi ? 'Start Deteksi' : 'Reset Deteksi'}</button>
        <p style={{ marginLeft: '10px', marginRight: '10px', }}>|</p>
        <select onChange={val => setSource(val.target.value)} style={{ borderRadius: '3px' }}>
          <option>---</option>
          <option value="ph_minyak">PH Minyak</option>
          <option value="conductivity" >Conductivity</option>
          <option value="turbidity" >Turbidity</option>
          <option value="warna_minyak" >Warna Minyak</option>
          {/* <option value="total_proses" >Total Proses</option> */}
        </select>
      </div>
      <div className="mt-4 flex flex-row items-center justify-center">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <HistoryChart name={source && mappingName[source]} source={source} data={dataHistory} />
        </div>
        <div className="w-full xl:w-3/12 px-4">
          {/* <CardBarChart /> */}
          <CardHistoryTable source={source} title={mappingName[source]} data={source ? dataHistory : []} />
        </div>
      </div>
    </>
  );
}

const style = {
  buttonActive: {
    backgroundColor: '#C70A80',
    color: '#fff',
    padding: '13px',
    borderRadius: '3px',
    fontWeight: 'bold',
    fontSize: '8pt',
  },
  buttonReset: {
    backgroundColor: '#fff',
    color: '#C70A80',
    padding: '13px',
    borderRadius: '3px',
    fontWeight: 'bold',
    fontSize: '8pt',
  }
}

const mappingName = {
  ph_minyak: 'PH Minyak',
  conductivity: 'Conductivity',
  turbidity: 'Turbidity',
  warna_minyak: 'Warna Minyak',
  minyak_baik: 'Minyak Baik',
  minyak_jahat: 'Minyak Jahat',
  total_proses: 'Total Proses',
}