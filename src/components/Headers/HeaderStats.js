import React, { useEffect, useState } from "react";
// import { collection, onSnapshot } from 'firebase/firestore'
// import { firestore } from "config";
import { ref, onValue } from 'firebase/database'
import { database } from "config";

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  
  const [data, setData] = useState({})
  
  useEffect(() => {
    const sensorRef = ref(database, 'sandro_sensor')
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setData({
        cahaya: data.cahaya,
        kelembaban_tanah: data.kelembaban_tanah,
        ph_tanah: data.ph_tanah,
        kelembaban_udara: data.kelembaban_udara,
        suhu_udara: data.suhu_udara,
      })
    })
    // onSnapshot(collection(firestore, 'tahap1', 'sandro', 'data'), docSnap => {
    //   let _data = {}
    //   docSnap.forEach(doc => {
    //     _data = {
    //       ..._data,
    //       [doc.id]: doc.data().value
    //     }
    //   })
    //   setData(_data)
    // })
  }, [])

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pt-12">
        <div className="px-4 md:px-10 w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Kelembaban Udara"
                  statTitle={data?.kelembaban_udara || 0}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-wind"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Suhu Udara"
                  statTitle={data?.suhu_udara || 0}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-wind"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Intensitas Cahaya"
                  statTitle={data?.cahaya || 0}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-lightbulb"
                  statIconColor="bg-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-lightBlue-600 md:pt-12 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="pH Tanah"
                  statTitle={data?.ph_tanah || 0}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-globe"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Kelembaban Tanah"
                  statTitle={data?.kelembaban_tanah || 0}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-globe"
                  statIconColor="bg-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
