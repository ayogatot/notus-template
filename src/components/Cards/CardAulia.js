import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle,
  suhu,
  ph,
  keranjangBuah,
  keranjangSayur,
  statPercentColor,
  intensitasCahaya,
  statIconName,
  statIconColor,
  type
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              {type === 'stat' ? (
                <>
                  <p className="pt-6 font-semibold text-xl text-blueGray-700">
                    <span className="font-light text-sm text-gray-700">Suhu: </span><span className="ml-3">{suhu}</span>
                  </p>
                  <p className="font-semibold text-xl text-blueGray-700">
                    <span className="font-light text-sm text-gray-700">pH: </span><span className="ml-3">{ph}</span>
                  </p>
                  <p className="font-semibold text-xl text-blueGray-700">
                    <span className="font-light text-sm text-gray-700">Intensitas Cahaya: </span><span style={{fontSize: 16}} className="ml-3">{intensitasCahaya}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="pt-6 font-semibold text-xl text-blueGray-700">
                    <span className="font-light text-sm text-gray-700">Keranjang Buah: </span><span className="ml-3">{keranjangBuah}</span>
                  </p>
                    <p className="pb-6 font-semibold text-xl text-blueGray-700">
                    <span className="font-light text-sm text-gray-700">Keranjang Sayur: </span><span className="ml-3">{keranjangSayur}</span>
                  </p>
                </>
              )}
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className={statPercentColor + " mr-2"}>
              {/* <i
                className={
                  statArrow === "up"
                    ? "fas fa-arrow-up"
                    : statArrow === "down"
                    ? "fas fa-arrow-down"
                    : ""
                }
              ></i>{" "}
              {statPercent}% */}
            </span>
            {/* <span className="whitespace-nowrap">{statDescripiron}</span> */}
            <span className="whitespace-nowrap">{""}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Traffic",
  statTitle: "350,897",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statDescripiron: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
