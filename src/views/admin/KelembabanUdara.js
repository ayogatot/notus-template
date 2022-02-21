import React from "react";

// components

import HistoryChart from "components/Cards/HistoryChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
import CardHistoryTable from "components/Cards/CardHistoryTable.js";
// import CardListButton from "../../components/Cards/CardListButton";

export default function KelembabanUdara() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <HistoryChart name="Kelembaban Udara" />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardBarChart /> */}
          <CardHistoryTable source="kelembaban_udara" />
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
