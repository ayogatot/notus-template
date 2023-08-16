import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from 'config';

import Terang from '../../assets/img/terang.png';
import Redup from '../../assets/img/redup.png';
import Mati from '../../assets/img/mati.png';

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const sensorRef = ref(database, 'reni');
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setData({
        node1: data.node1,
        node2: data.node2,
        node3: data.node3,
        node4: data.node4,
      });
    });
  }, []);

  const mappingImg = {
    0: Mati,
    1: Terang,
    2: Redup,
  };

  const mappingStatus = {
    0: 'Mati',
    1: 'Terang',
    2: 'Redup',
  };

  const mappingMeja = {
    0: 'Kosong',
    1: 'Digunakan',
  };

  return (
    <>
      <div
        style={{ height: '100vh' }}
        className='bg-emerald-500 mb-24 md:pt-6 py-6 pt-12'
      >
        <div className='px-4 md:px-10 w-full h-full'>
          <div
            style={{ justifyContent: 'center', alignItems: 'center' }}
            className='flex flex-wrap'
          >
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4 my-4'>
              <div className='bg-emerald-400' style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>1</div>
                  <img alt='...' style={style.imgStyle} src={mappingImg['1']} />
                </div>
                <div style={style.col2}>
                  <p>
                    Meja Jahit: <b>{mappingMeja[data.node1?.meja]}</b>
                  </p>
                  <p>
                    Nilai Lux: <b>{data.node1?.lux}</b>
                  </p>
                  <p>
                    Nyala Lampu: <b>{mappingStatus[data.node1?.status]}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4 my-4'>
              <div className='bg-emerald-400' style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>2</div>
                  <img alt='...' style={style.imgStyle} src={mappingImg['1']} />
                </div>
                <div style={style.col2}>
                  <p>
                    Meja Jahit: <b>{mappingMeja[data.node2?.meja]}</b>
                  </p>
                  <p>
                    Nilai Lux: <b>{data.node2?.lux}</b>
                  </p>
                  <p>
                    Nyala Lampu: <b>{mappingStatus[data.node2?.status]}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ justifyContent: 'center', alignItems: 'center' }}
            className='flex flex-wrap'
          >
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4 my-4'>
              <div className='bg-emerald-400' style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>3</div>
                  <img alt='...' style={style.imgStyle} src={mappingImg['1']} />
                </div>
                <div style={style.col2}>
                  <p>
                    Meja Jahit: <b>{mappingMeja[data.node3?.meja]}</b>
                  </p>
                  <p>
                    Nilai Lux: <b>{data.node3?.lux}</b>
                  </p>
                  <p>
                    Nyala Lampu: <b>{mappingStatus[data.node3?.status]}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4 my-4'>
              <div className='bg-emerald-400' style={style.cardContainer}>
                <div style={style.col1}>
                  <div style={style.number}>4</div>
                  <img alt='...' style={style.imgStyle} src={mappingImg['1']} />
                </div>
                <div style={style.col2}>
                  <p>
                    Meja Jahit: <b>{mappingMeja[data.node4?.meja]}</b>
                  </p>
                  <p>
                    Nilai Lux: <b>{data.node4?.lux}</b>
                  </p>
                  <p>
                    Nyala Lampu: <b>{mappingStatus[data.node4?.status]}</b>
                  </p>
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
    borderRadius: '5px',
  },
  cardContainer2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  imgStyle: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  col1: {
    width: '30%',
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
  },
};
