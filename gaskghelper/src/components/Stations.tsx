"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Buses } from "./Buses";
import { ChevronLeft, Search } from "lucide-react";

const url: string = "http://localhost:5000/";

async function fetchFunction(parameter: string = "", time: string = "") {
  try {
    let response;
    if (parameter.length > 0 && time.length > 0)
      response = await fetch(`${url}${parameter}/${time}`);
    else response = await fetch(url);
    console.log("ALO", response);
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

export function Stations() {
  const [stations, setStations] = useState<string[]>([]);
  const [buses, setBuses] = useState<Departures | null>(null);
  const [busesActive, setBusesActive] = useState("");
  const [searchedStations, setSearchedStations] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFunction();
      setStations(data.stations_arr);
      setSearchedStations(data.stations_arr);
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
    const time = today.toLocaleTimeString("en-GB").slice(0, 5);
    const buses = await fetchFunction(name, time);

    return buses;
  }
  const getBuses = async (event: any) => {
    const station = event.target.innerHTML;
    const buses = await getStationStops(station);
    setBuses(buses);
    setBusesActive(station);
  };

  var a: { [key: string]: string } = {
    Ё: "YO",
    Й: "I",
    Ц: "TS",
    У: "U",
    К: "K",
    Е: "E",
    Н: "N",
    Г: "G",
    Ш: "SH",
    Щ: "SCH",
    З: "Z",
    Х: "H",
    Ъ: "'",
    ё: "yo",
    й: "i",
    ц: "ts",
    у: "u",
    к: "k",
    е: "e",
    н: "n",
    г: "g",
    ш: "sh",
    щ: "sch",
    з: "z",
    х: "h",
    ъ: "'",
    Ф: "F",
    Ы: "I",
    В: "V",
    А: "A",
    П: "P",
    Р: "R",
    О: "O",
    Л: "L",
    Д: "D",
    Ж: "ZH",
    Э: "E",
    ф: "f",
    ы: "i",
    в: "v",
    а: "a",
    п: "p",
    р: "r",
    о: "o",
    л: "l",
    д: "d",
    ж: "zh",
    э: "e",
    Я: "Ya",
    Ч: "CH",
    С: "S",
    М: "M",
    И: "I",
    Т: "T",
    Ь: "'",
    Б: "B",
    Ю: "YU",
    я: "ya",
    ч: "ch",
    с: "s",
    м: "m",
    и: "i",
    т: "t",
    ь: "'",
    б: "b",
    ю: "yu",
  };

  function transliterate(word: string) {
    return word
      .split("")
      .map(function (char) {
        return a[char] || char;
      })
      .join("");
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const searchedStationsArr = stations.filter((station) => {
      console.log(station, search);
      if (transliterate(station).includes(search)) {
        return station;
      }
    });
    setSearchedStations(searchedStationsArr);
  };

  return (
    <>
      {!busesActive && (
        <>
          <div className="py-5 w-full flex justify-center items-center">
            <div className="relative">
              <input
                onChange={handleChange}
                type="text"
                placeholder="Search..."
                className="p-2 border text-xl border-neutral-500 rounded-2xl w-[400px] h-[50px]"
              />
              <Search className="absolute top-3 right-3" />
            </div>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {searchedStations.map((station) => {
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
      )}
      {busesActive && (
        <div className="flex w-full flex-col justify-center items-center gap-5 relative">
          <Buses buses={buses} station={busesActive} />
          <button
            className="absolute top-7 left-10"
            onClick={() => setBusesActive("")}
          >
            <ChevronLeft size={40} />
          </button>
        </div>
      )}
    </>
  );
}
