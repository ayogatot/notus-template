import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore'
import { firestore } from "config";

// components
import HistoryChart from "components/Cards/HistoryChart.js";
import CardHistoryTable from "components/Cards/CardHistoryTable.js";

export default function KelembabanUdara() {
  const [data, setData] = useState([])

  useEffect(() => {
    onSnapshot(collection(firestore, 'tahap1', 'sandro', 'history'), docSnap => {
      let _data = []
      docSnap.forEach(doc => {
        _data.push(doc.data())
      })
      setData(_data)
    })
  }, [])

  return (
    <>
      <div className="flex flex-wrap pt-12">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <HistoryChart name="Kelembapan Udara" source="kelembaban_udara" data={data} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardBarChart /> */}
          <CardHistoryTable source="kelembaban_udara" data={data} />
        </div>
      </div>
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-4/12 px-4">
          <CardListButton />
        </div>
      </div> */}
    </>
  );
}
