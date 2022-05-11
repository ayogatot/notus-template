import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore'
import { firestore } from "config";

// components
import HistoryChart from "components/Cards/HistoryAulia";
import CardHistoryTable from "components/Cards/CardHistoryTable.js";

export default function KelembabanUdara() {
  const [data, setData] = useState([])

  useEffect(() => {
    onSnapshot(collection(firestore, 'tahap1', 'aulia', 'history'), docSnap => {
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
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <HistoryChart name="Pengomposan suhu" source1="suhuSayur" source2="suhuBuah" data={data} />
        </div>
        <div className="w-full xl:w-3/12 px-4">
          {/* <CardBarChart /> */}
          <CardHistoryTable source="suhuSayur" title="Suhu Sayur" data={data} />
        </div>
        <div className="w-full xl:w-3/12 px-4">
          {/* <CardBarChart /> */}
          <CardHistoryTable source="suhuBuah" title="Suhu Buah" data={data} />
        </div>
      </div>
    </>
  );
}
