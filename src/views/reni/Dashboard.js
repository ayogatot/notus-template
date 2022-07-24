import React, { useState, useEffect } from "react";
import { ref, onValue } from 'firebase/database'
import { database } from "config";
// import { collection, onSnapshot } from 'firebase/firestore'

import Terang from '../../assets/img/terang.png'
import Redup from '../../assets/img/redup.png'
import Mati from '../../assets/img/mati.png'

// import HistoryChart from "components/Cards/HudaHistory";
// import CardHistoryTable from "components/Cards/CardHistoryTableHuda.js";

export default function Dashboard() {
  const [data, setData] = useState({})
  // const [dataHistory, setDataHistory] = useState([])
  // const [source, setSource] = useState('dashboard')

  useEffect(() => {
    const sensorRef = ref(database, 'reni')
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setData({
        node1: data.node1,
        node2: data.node2,
        node3: data.node3,
        node4: data.node4,
      })
    })
  }, [])

  const mappingImg = {
    '0': Mati,
    '1': Terang,
    '2': Redup,
  }

  const mappingStatus = {
    '0': 'Mati',
    '1': 'Terang',
    '2': 'Redup',
  }

  const mappingMeja = {
    '0': 'Kosong',
    '1': 'Digunakan',
  }

  // const onClick = () => {
  //   const sensorRef = ref(database, 'huda/deteksi')
  //   set(sensorRef, !data?.deteksi)
  // }

  return (
    <>
      <div style={{ height: '100vh' }} className="bg-emerald-500 mb-24 md:pt-6 py-6 pt-12">
        <div className="px-4 md:px-10 w-full h-full">
          <div style={{ justifyContent: 'center', alignItems: 'center' }} className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
              <div className="bg-emerald-400" style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>
                    1
                  </div>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg['1']}
                  />
                </div>
                <div style={style.col2}>
                  <p>Meja Jahit: <b>{mappingMeja[data.node1?.meja]}</b></p>
                  <p>Nilai Lux: <b>{data.node1?.lux}</b></p>
                  <p>Nyala Lampu: <b>{mappingStatus[data.node1?.status]}</b></p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
              <div className="bg-emerald-400" style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>
                    2
                  </div>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg['1']}
                  />
                </div>
                <div style={style.col2}>
                  <p>Meja Jahit: <b>{mappingMeja[data.node2?.meja]}</b></p>
                  <p>Nilai Lux: <b>{data.node2?.lux}</b></p>
                  <p>Nyala Lampu: <b>{mappingStatus[data.node2?.status]}</b></p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ justifyContent: 'center', alignItems: 'center' }} className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
              <div className="bg-emerald-400" style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>
                    3
                  </div>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg['1']}
                  />
                </div>
                <div style={style.col2}>
                  <p>Meja Jahit: <b>{mappingMeja[data.node3?.meja]}</b></p>
                  <p>Nilai Lux: <b>{data.node3?.lux}</b></p>
                  <p>Nyala Lampu: <b>{mappingStatus[data.node3?.status]}</b></p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
              <div className="bg-emerald-400" style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>
                    4
                  </div>
                  <img
                    alt="..."
                    style={style.imgStyle}
                    src={mappingImg['1']}
                  />
                </div>
                <div style={style.col2}>
                  <p>Meja Jahit: <b>{mappingMeja[data.node4?.meja]}</b></p>
                  <p>Nilai Lux: <b>{data.node4?.lux}</b></p>
                  <p>Nyala Lampu: <b>{mappingStatus[data.node4?.status]}</b></p>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '5px'
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
    marginBottom: '10px',
  },
  col1: {
    width: '30%'
  },
  col2: {
    width: '67%',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
  },
  number: {
    backgroundColor: '#fff',
    color: '#10B981',
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-30px',
    marginLeft: '-30px',
  }
}

// {
//   source === 'dashboard' ? (
//     <div>
//       <div className="flex flex-wrap">
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <p className="font-semibold">Meja 1</p>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.meja1]}
//             />
//             <img
//               alt="..."
//               style={{ width: 150, marginTop: -30 }}
//               src={require("../../assets/img/meja.png").default}
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.ruangan1]}
//             />
//             <p className="text-xl font-bold" >Lampu Ruangan 1</p>
//           </div>
//         </div>
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <p className="font-semibold">Meja 2</p>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.meja2]}
//             />
//             <img
//               alt="..."
//               style={{ width: 150, marginTop: -30 }}
//               src={require("../../assets/img/meja.png").default}
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.ruangan2]}
//             />
//             <p className="text-xl font-bold" >Lampu Ruangan 2</p>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-wrap">
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <p className="font-semibold">Meja 3</p>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.meja3]}

//             />
//             <img
//               alt="..."
//               style={{ width: 150, marginTop: -30 }}
//               src={require("../../assets/img/meja.png").default}
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.ruangan3]}
//             />
//             <p className="text-xl font-bold" >Lampu Ruangan 3</p>
//           </div>
//         </div>
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <p className="font-semibold">Meja 5</p>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.meja5]}
//             />
//             <img
//               alt="..."
//               style={{ width: 150, marginTop: -30 }}
//               src={require("../../assets/img/meja.png").default}
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.ruangan4]}
//             />
//             <p className="text-xl font-bold" >Lampu Ruangan 4</p>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-wrap">
//         <div className="w-full lg:w-6/12 xl:w-3/12 px-4 my-4">
//           <div style={style.cardContainer}>
//             <p className="font-semibold">Meja 4</p>
//             <img
//               alt="..."
//               style={style.imgStyle}
//               src={mappingImg[data?.meja4]}
//             />
//             <img
//               alt="..."
//               style={{ width: 150, marginTop: -30 }}
//               src={require("../../assets/img/meja.png").default}
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-4/12  px-4 my-4">
//           <div className="py-6" style={style.cardContainer2}>
//             <p className="font-semibold">Keterangan: </p>
//             <div className="flex lg:w-4/12 justify-between items-center flex-row">
//               <img
//                 alt="..."
//                 style={{ width: '60px' }}
//                 src={require("../../assets/img/mati.png").default}
//               />
//               <p>Lampu Mati</p>
//             </div>
//             <div className="flex lg:w-4/12 justify-between items-center flex-row">
//               <img
//                 alt="..."
//                 style={{ width: '40px' }}
//                 src={require("../../assets/img/redup.png").default}
//               />
//               <p>Lampu Redup</p>
//             </div>
//             <div className="flex lg:w-4/12 justify-between items-center flex-row">
//               <img
//                 alt="..."
//                 style={{ width: '40px' }}
//                 src={require("../../assets/img/terang.png").default}
//               />
//               <p>Lampu Terang</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <button
//             className={`mt-4 bg-red-500 active:bg-emerald-600 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
//             type="button"
//             onClick={() => setSource('rincian')}
//           >
//             LIHAT RINCIAN
//           </button>
//         </div>

//       </div>
//     </div>
//   ) : (
//   <div>
//     <div>
//       <button
//         className={`mt-4 bg-red-500 active:bg-emerald-600 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
//         type="button"
//         onClick={() => setSource('dashboard')}
//       >
//         DASHBOARD
//       </button>
//     </div>
//     <div>
//       <CardHistoryTable source={source} title={'History'} data={dataHistory} />
//     </div>
//   </div>
// )
// }