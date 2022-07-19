import React, { useEffect } from "react";
import Chart from "chart.js";

// const mappingSatuan = {
//   intensitasSayur: 'lux',
//   intensitasBuah: 'lux',
//   phSayur: '',
//   phBuah: '',
//   suhuSayur: '℃',
//   suhuBuah: '℃',
// }

export default function HistoryChart(props) {
  useEffect(() => {
    const propsData = props.data.slice(0, 6).sort((a, b) => a.createdAt - b.createdAt)
    const labels = propsData.map(i => i.tglText)
    const data1 = propsData.map(i => i[props.source1])
    const data2 = propsData.map(i => i[props.source2])
    const config = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: data1,
            fill: false,
          },
          {
            label: new Date().getFullYear(),
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: data2,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [props.data, props.source, props.source1, props.source2]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">{`${props.name} 7 Hari Terakhir`}</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          {/* {props.data.length > 0 && ( */}
            <div className="relative h-350-px">
              <canvas id="line-chart"></canvas>
            </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
