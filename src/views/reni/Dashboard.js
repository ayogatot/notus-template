import React, { useState, useEffect } from "react";
import { ref, onValue } from 'firebase/database'
import { database, firestore } from "config";
import { collection, onSnapshot } from 'firebase/firestore'

import Terang from '../../assets/img/terang.png'
import Redup from '../../assets/img/redup.png'
import Mati from '../../assets/img/mati.png'

// import HistoryChart from "components/Cards/HudaHistory";
// import CardHistoryTable from "components/Cards/CardHistoryTableHuda.js";

export default function Dashboard() {
  const [data, setData] = useState({})
  // const [dataHistory, setDataHistory] = useState([])
  // const [source, setSource] = useState(null)

  useEffect(() => {
    const sensorRef = ref(database, 'reni')
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setData({
        meja1: data.meja1,
        meja2: data.meja2,
        meja3: data.meja3,
        meja4: data.meja4,
        meja5: data.meja5,
        ruangan1: data.ruangan1,
        ruangan2: data.ruangan2,
        ruangan3: data.ruangan3,
        ruangan4: data.ruangan4,
      })
    })

    onSnapshot(collection(firestore, 'tahap1', 'huda', 'history'), docSnap => {
      let _data = []
      docSnap.forEach(doc => {
        _data.push(doc.data())
      })
      // setDataHistory(_data)
    })
  }, [])

  const mappingImg = {
    '0': Mati,
    '1': Terang,
    '2': Redup,
  }


  // const onClick = () => {
  //   const sensorRef = ref(database, 'huda/deteksi')
  //   set(sensorRef, !data?.deteksi)
  // }

  return (
    <>
      <div className="relative bg-emerald-500 mb-24 md:pt-6 py-6">
        <div className="px-4 md:px-10 w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <p className="font-semibold">Meja 1</p>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.meja1]}
                  />
                  <img
                    alt="..."
                    style={{ width: 150, marginTop: -30 }}
                    src={require("../../assets/img/meja.png").default}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.ruangan1]}
                  />
                  <p className="text-xl font-bold" >Lampu Ruangan 1</p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <p className="font-semibold">Meja 2</p>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.meja2]}
                  />
                  <img
                    alt="..."
                    style={{ width: 150, marginTop: -30 }}
                    src={require("../../assets/img/meja.png").default}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.ruangan2]}
                  />
                  <p className="text-xl font-bold" >Lampu Ruangan 2</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <p className="font-semibold">Meja 3</p>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.meja3]}

                  />
                  <img
                    alt="..."
                    style={{ width: 150, marginTop: -30 }}
                    src={require("../../assets/img/meja.png").default}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.ruangan3]}
                  />
                  <p className="text-xl font-bold" >Lampu Ruangan 3</p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <p className="font-semibold">Meja 5</p>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.meja5]}
                  />
                  <img
                    alt="..."
                    style={{ width: 150, marginTop: -30 }}
                    src={require("../../assets/img/meja.png").default}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.ruangan4]}
                  />
                  <p className="text-xl font-bold" >Lampu Ruangan 4</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
                <div style={style.cardContainer}>
                  <p className="font-semibold">Meja 4</p>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg[data?.meja4]}
                  />
                  <img
                    alt="..."
                    style={{ width: 150, marginTop: -30 }}
                    src={require("../../assets/img/meja.png").default}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12  px-4 my-4">
                <div className="py-6" style={style.cardContainer2}>
                  <p className="font-semibold">Keterangan: </p>
                  <div className="flex lg:w-4/12 justify-between items-center flex-row">
                    <img
                      alt="..."
                      style={{ width: '60px' }}
                      src={require("../../assets/img/mati.png").default}
                    />
                    <p>Lampu Mati</p>
                  </div>
                  <div className="flex lg:w-4/12 justify-between items-center flex-row">
                    <img
                      alt="..."
                      style={{ width: '40px' }}
                      src={require("../../assets/img/redup.png").default}
                    />
                    <p>Lampu Redup</p>
                  </div>
                  <div className="flex lg:w-4/12 justify-between items-center flex-row">
                    <img
                      alt="..."
                      style={{ width: '40px' }}
                      src={require("../../assets/img/terang.png").default}
                    />
                    <p>Lampu Terang</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px'
  },
  imgStyle: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  }
}