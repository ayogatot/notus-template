import React from "react";
// import { collection, onSnapshot } from 'firebase/firestore'
// import { firestore } from "config";

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
      <div className="relative bg-emerald-400 mb-24 md:pt-32 pt-12">
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
