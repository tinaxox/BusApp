import axios from "axios";
import express from "express";
import indexRouter from "../routes/index";
import cors from "cors";

import {
  TLine,
  TLineDepartures,
  TDeparture,
  TTrips,
  StationsByDeparture,
  Stations,
  Day,
  Station,
  Stop,
} from "./types";
import {
  saveLinesToFile,
  saveBusesToFile,
  saveBusTripToFile,
  saveStationToFile,
  saveStationsToFile,
} from "./save_to_file";

import {
  getBusesFromFile,
  getStationsFromFile,
  getTripsFromFile,
} from "./get_from_file";

const app = express();
// var connect = require("connect");
app.use(cors()); //app.use(cors(origin:"127.00...."))
app.use(indexRouter);

async function getLines() {
  //   const res = await axios.get("https://gas-kg.herokuapp.com/timetable/lines");
  const lines: TLine[] = [
    {
      lineId: 1,
      lineIndex: "1",
      lineName: "(Голочело) Драгобраћа - Корман (Ботуње)",
    },
    {
      lineId: 393,
      lineIndex: "2",
      lineName: "(Нови Милановац) Петровац - Ждраљица (Доња Сабанта)",
    },
    {
      lineId: 748,
      lineIndex: "3",
      lineName: "Денино Брдо - Бресница(Водовод) ",
    },
    {
      lineId: 887,
      lineIndex: "4",
      lineName: "Аутобуска станица - Стара Колонија - Аутобуска станица",
    },
    {
      lineId: 967,
      lineIndex: "5",
      lineName: "Виногради - Мале Пчелице",
    },
    {
      lineId: 1138,
      lineIndex: "6",
      lineName: "(Кванташ) Аутобуска станица - Грошница",
    },
    {
      lineId: 12688,
      lineIndex: "7",
      lineName: "Палата Правде - Центар - Палата Правде",
    },
    {
      lineId: 11302,
      lineIndex: "8",
      lineName: "/Вишњак/Багремар - Илићево Споменик/Стара Општина/",
    },
    {
      lineId: 1401,
      lineIndex: "9",
      lineName: "Ћифтина Ћуприја - Цветојевац",
    },
    { lineId: 1521, lineIndex: "10", lineName: "Ердеч - Маршић" },
    {
      lineId: 1657,
      lineIndex: "11",
      lineName: "Хотел - Станово - Хотел",
    },
    { lineId: 1734, lineIndex: "13", lineName: "Трмбас - Грошница" },
    { lineId: 1853, lineIndex: "14", lineName: "Трмбас - Кванташ" },
    {
      lineId: 1934,
      lineIndex: "15",
      lineName: "Корићани - Шумарице (Драча)",
    },
    {
      lineId: 2166,
      lineIndex: "16",
      lineName: "Велико Поље - Десимировац (Село)",
    },
    {
      lineId: 2365,
      lineIndex: "17",
      lineName: "Баљковац - Дом Старих - Језеро",
    },
    {
      lineId: 2530,
      lineIndex: "18",
      lineName: "Бозман - Мала вага - Бозман",
    },
    {
      lineId: 2589,
      lineIndex: "19",
      lineName: "Денино брдо - Центар - Денино брдо",
    },
    {
      lineId: 2721,
      lineIndex: "20",
      lineName: "Денино брдо - Корићани",
    },
    { lineId: 2858, lineIndex: "24", lineName: "Ћава - Кошутњак брдо" },
    { lineId: 2976, lineIndex: "25", lineName: "Ердеч - Шумски рај" },
    {
      lineId: 10777,
      lineIndex: "26",
      lineName: "Мале Пчелице (Старо Село) - Теферич (Викенд Насеље)",
    },
    {
      lineId: 3222,
      lineIndex: "600",
      lineName: "Крагујевац - Велика Сугубина - Први Ракаљ ",
    },
    {
      lineId: 3287,
      lineIndex: "601",
      lineName: "Ц́ифтина ц́уприја - Букуровац",
    },
    {
      lineId: 3346,
      lineIndex: "602",
      lineName: "Крагујевац - Рогојевац - Каменица",
    },
    {
      lineId: 3453,
      lineIndex: "603",
      lineName: "Крагујевац - Доње Грбице",
    },
    {
      lineId: 3534,
      lineIndex: "604",
      lineName: "Ц́ифтина ц́уприја - Ресник",
    },
    { lineId: 3623, lineIndex: "605", lineName: "Крагујевац - Дулене" },
    {
      lineId: 3693,
      lineIndex: "606",
      lineName: "Крагујевац - Страгари",
    },
    {
      lineId: 3795,
      lineIndex: "607",
      lineName: "Крагујевац - Доње Комарице",
    },
    {
      lineId: 4889,
      lineIndex: "608",
      lineName: "Крагујевац - МИНД - Горње Јарушице",
    },
    {
      lineId: 3878,
      lineIndex: "609",
      lineName: "Крагујевац - Горње Грбице - Пајазитово - Мала Врбица",
    },
    {
      lineId: 3955,
      lineIndex: "610",
      lineName: "Крагујевац - Дреновац - Ђурисело",
    },
    {
      lineId: 4049,
      lineIndex: "611",
      lineName: "Крагујевац - Лужнице",
    },
    {
      lineId: 4146,
      lineIndex: "612",
      lineName: "Крагујевац - Вињиште",
    },
    {
      lineId: 12437,
      lineIndex: "613",
      lineName: "Крагујевац - Лужнице - Мала Врбица",
    },
  ];
  saveLinesToFile(lines);
  return lines;
}

async function getBus(lines: TLine[], day: Day) {
  var buses: TLineDepartures[] = [];
  var bus: TLineDepartures;
  for (let i = 0; i < lines.length; i++) {
    buses = [];
    const res = await axios.get(
      "https://gas-kg.herokuapp.com/timetable/lines/" +
        lines[i].lineId +
        "/departures?day=" +
        day
    );
    const busDepartureA: TDeparture[] = res.data.directionA;
    const busDepartureB: TDeparture[] = res.data.directionB;
    const busLineId = lines[i].lineIndex;
    bus = { busLineId, busDepartureA, busDepartureB };
    buses.push(bus);
    saveBusesToFile(bus, busLineId, day);
  }
  return buses;
}

async function getTrip(buses: TDeparture) {
  const res = await axios.get(
    "https://gas-kg.herokuapp.com/timetable/trips/" + buses.departureId
  );
  return res.data as TTrips;
}

async function loadBuses(buses: TLineDepartures, day: Day) {
  var busDepartureA: TTrips[] = [];
  var busDepartureB: TTrips[] = [];
  var allTrips: StationsByDeparture;
  for (let j = 0; j < buses.busDepartureA.length; j++) {
    const t = buses.busDepartureA[j];
    busDepartureA.push((await getTrip(t)) as TTrips);
  }
  for (let j = 0; j < buses.busDepartureB.length; j++) {
    const t = buses.busDepartureB[j];
    busDepartureB.push((await getTrip(t)) as TTrips);
  }
  const busLineId = buses.busLineId;
  allTrips = { busLineId, busDepartureA, busDepartureB };
  saveBusTripToFile(allTrips, buses.busLineId, day);
}

function stationExists(station: string, stations: string[]) {
  for (let station1 of stations) {
    if (station === station1) {
      return true;
    }
  }
  return false;
}

async function getStations(departures: StationsByDeparture[], day: Day) {
  const stationsNames: string[] = []; //ima mnogo vise, jer se ponavljaju
  for (let busLine of departures) {
    const busLineId: string = busLine.busLineId;
    for (let departure of busLine.busDepartureA) {
      const direction: string = departure.startPoint + "-" + departure.endPoint;
      for (let stop of departure.stops) {
        const time: string = stop.stopTime;
        const station: Station = { busLineId, time, direction }; //treba mi smer!!
        const exists = stationExists(stop.stanceName, stationsNames);
        if (exists == false) {
          stationsNames.push(stop.stanceName);
        }
        saveStationToFile(station, day, stop.stanceName, "A");
      }
    }
    for (let departure of busLine.busDepartureB) {
      const direction: string = departure.startPoint + "-" + departure.endPoint;
      for (let stop of departure.stops) {
        const time: string = stop.stopTime;
        const station: Station = { busLineId, time, direction };
        if (stationExists(stop.stanceName, stationsNames) == false) {
          stationsNames.push(stop.stanceName);
        }
        saveStationToFile(station, day, stop.stanceName, "B");
      }
    }
  }
  return stationsNames;
}

async function start() {
  const lines = await getLines();
  // const busesWork = await getBus(lines, Day.workday);
  // const busesSat = await getBus(lines, Day.saturday);
  // const busesSun = await getBus(lines, Day.sunday);
  // const busesWork = await getBusesFromFile(lines, Day.workday);
  // const busesSat = await getBusesFromFile(lines, Day.saturday);
  // const busesSun = await getBusesFromFile(lines, Day.sunday);
  // for (let bus of busesSat) {
  //   loadBuses(bus, Day.saturday);
  // }
  // for (let bus of busesSun) {
  //   loadBuses(bus, Day.sunday);
  // }
  // for (let trip of trips_workday) {
  //   console.log(trip);
  // }
  // const trips_workday = await getTripsFromFile(Day.workday, lines);
  // const trips_saturday = await getTripsFromFile(Day.saturday, lines);
  // const trips_sunday = await getTripsFromFile(Day.sunday, lines);
  // const stationsNamesW = await getStations(trips_workday, Day.workday);
  // const stationsNamesSa = await getStations(trips_saturday, Day.saturday);
  // const stationsNamesSu = await getStations(trips_sunday, Day.sunday);

  // saveStationsToFile(stationsNamesW);
  // saveStationsToFile(stationsNamesSa);
  // saveStationsToFile(stationsNamesSu);

  // const stationsNames = (await getStationsFromFile()) as string[];
  // console.log(stationsNames);
  // setButtons(stationsNames, document);
  // for (let i = 0; i < stationsNames.length; i++)
  // var app = connect().use(connect.static(`/station/:${stationsNames[i]}`));
  app.listen(5000, () => {
    console.log("Press CTRL-C to stop\n");
  });
}
start();
