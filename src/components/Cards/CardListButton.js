import React, { useState, useEffect } from "react";
import { ref, onValue, set } from 'firebase/database'

import { database } from "../../config";

export default function CardSocialTraffic() {
  const controlRef = ref(database, 'sandro_control')

  const [cahaya, setCahaya] = useState(true)
  const [pupuk, setPupuk] = useState(true)
  const [air, setAir] = useState(true)
  const [kipas, setKipas] = useState(true)
  const [humidifier, setHumidifier] = useState(true)

  const setToFB = (type, value) => {
    const data = {
      cahaya: cahaya ? 1 : 0,
      pupuk: pupuk ? 1 : 0,
      air: air ? 1 : 0,
      kipas: kipas ? 1 : 0,
      humidifier: humidifier ? 1 : 0,
    }
    
    set(controlRef, { 
      ...data,
      [type]: value,
    })

  }

  useEffect(() => {
    onValue(controlRef, (snapshot) => {
      const data = snapshot.val();
      setAir(data.air === 1 ? true : false)
      setCahaya(data.cahaya === 1 ? true : false)
      setKipas(data.kipas === 1 ? true : false)
      setPupuk(data.pupuk === 1 ? true : false)
      setHumidifier(data.humidifier === 1 ? true : false)
    })
  }, [controlRef])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Quick Control
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Cahaya
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button
                    className={`${cahaya ? "bg-emerald-500 active:bg-emerald-600" : "bg-red-500 active:bg-red-600"} text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setCahaya(!cahaya)
                      setToFB('cahaya', !cahaya ? 1 : 0)
                    }}
                  >
                    {cahaya ? "ON" : "OFF"}
                  </button>
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Air
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button
                    className={`${air ? "bg-emerald-500 active:bg-emerald-600" : "bg-red-500 active:bg-red-600"} text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setAir(!air)
                      setToFB('air', !air ? 1 : 0)
                    }}
                  >
                    {air ? "ON" : "OFF"}
                  </button>
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Pupuk
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button
                    className={`${pupuk ? "bg-emerald-500 active:bg-emerald-600" : "bg-red-500 active:bg-red-600"} text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setPupuk(!pupuk)
                      setToFB('pupuk', !pupuk ? 1 : 0)
                    }}
                  >
                    {pupuk ? "ON" : "OFF"}
                  </button>
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Kipas
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button
                    className={`${kipas ? "bg-emerald-500 active:bg-emerald-600" : "bg-red-500 active:bg-red-600"} text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setKipas(!kipas)
                      setToFB('kipas', !kipas ? 1 : 0)
                    }}
                  >
                    {kipas ? "ON" : "OFF"}
                  </button>
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Humidifier
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button
                    className={`${humidifier ? "bg-emerald-500 active:bg-emerald-600" : "bg-red-500 active:bg-red-600"} text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setHumidifier(!humidifier)
                      setToFB('humidifier', !humidifier ? 1 : 0)
                    }}
                  >
                    {humidifier ? "ON" : "OFF"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
