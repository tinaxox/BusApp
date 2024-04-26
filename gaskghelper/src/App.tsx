"use client";
import { useEffect, useState } from "react";
import "./App.css";

const url: string = "http://localhost:5000/";

async function fetchFunction(parameter: any = "") {
  try {
    let response;
    if (parameter.length > 0) response = await fetch(`${url}${parameter}`);
    else response = await fetch(url);
    const jsonData = await response.json();
    if (response.ok) {
      return jsonData;
    } else {
      throw new Error("Response " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [stations, setStations] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFunction();
      setStations(data.stations_arr);
    };
    fetchData();
  }, []);

  async function getStationStops(station: string) {
    var today = new Date();
    let day;
    if (today.getDay() == 6) {
      day = "saturday";
    } else if (today.getDay() == 0) {
      day = "sunday";
    } else {
      day = "work_day";
    }
    const name = station.split(" ").join("_") + "_" + day;
    const buses = await fetchFunction(name);

    return buses;
  }
  const getBuses = async (event: any) => {
    const station = event.target.innerHTML;
    const buses = await getStationStops(station);
    console.log(buses);
  };

  return (
    <>
      <div className="p-4 bg-red-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {stations.map((station) => {
          return (
            <button
              key={station}
              onClick={getBuses}
              className="border-none p-4 rounded-xl m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] whitespace-nowrap min-w-[220px] bg-white"
            >
              {station}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
