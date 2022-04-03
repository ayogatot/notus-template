import React, { useEffect, useState } from "react";
// import { collection, onSnapshot } from 'firebase/firestore'
// import { firestore } from "config";


import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  
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

  return (
    <>
      {/* Header */}
      <div className="relative bg-yellow-500 mb-24 md:pt-32 pt-12">
        <div className="px-4 md:px-10 w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <></>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
