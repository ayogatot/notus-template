import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { firestore } from "config";
import { ref, onValue } from 'firebase/database'
import { database } from "config";

import CardAulia from "components/Cards/CardAulia.js";

export default function HeaderAulia() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const sensorRef = ref(database, 'aulia')
    onValue(sensorRef, (snapshot) => {
      const { buah, sayur, total } = snapshot.val();
      setData({
        buah,
        sayur,
        total
      })
    })
  }, [])

  const confirmationModal = async () => {
    setIsLoading(true)
    onSnapshot(collection(firestore, 'tahap1', 'aulia', 'history'), docSnap => {
      const data = []
      if(!docSnap.size) {
        setTimeout(() => {
          setIsLoading(false)
          alert('History is already empty')
        }, 1000)
      }
      docSnap.forEach(async d => {
        data.push(d.id)
        await deleteDoc(doc(firestore, 'tahap1', 'aulia', 'history', d.id))

        if (data.length === docSnap.size) {
          setTimeout(() => {
            setIsLoading(false)
            alert('History is already empty')
          }, 1000)
        }
      })
    })
  }

  return (
    <>
      {/* Header */}
      <div className="relative bg-emerald-400 mb-24 md:pt-32 pt-12">
        <div className="px-4 md:px-10 w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardAulia
                  statSubtitle="Keranjang Buah"
                  suhu={(data?.buah?.suhu || 0) + " °C"}
                  ph={(data?.buah?.ph || 0)}
                  intensitasCahaya={(data?.buah?.intensitasCahaya || 0) + " Lux"}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-wind"
                  statIconColor="bg-red-500"
                  type="stat"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardAulia
                  statSubtitle="Keranjang Sayur"
                  suhu={(data?.sayur?.suhu || 0) + " °C"}
                  ph={(data?.sayur?.ph || 0)}
                  intensitasCahaya={(data?.sayur?.intensitasCahaya || 0) + " Lux"}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-lightbulb"
                  statIconColor="bg-orange-500"
                  type="stat"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <CardAulia
                  statSubtitle="Total"
                  keranjangBuah={data?.total?.buah || 0}
                  keranjangSayur={data?.total?.sayur || 0}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-globe"
                  statIconColor="bg-lightBlue-500"
                  type="total"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <p className="text-white font-bold">Reset History</p>
                <button
                  className={`bg-red-500 active:bg-emerald-600 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  onClick={() => confirmationModal()}
                >
                  {isLoading ? "Loading..." : "Reset"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
