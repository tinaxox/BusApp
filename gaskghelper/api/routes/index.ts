import { Router } from "express";
import { getStationsFromFile } from "../src/get_from_file";
import { Station } from "../src/types";
var fs = require("fs");

const router: Router = Router();
router.get("/", async (_req, res) => {
  const stationsNames = (await getStationsFromFile()) as string[];
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); //ako imam origin
  //ne treba mi to
  const stations_arr = stationsNames;
  const stations = { stations_arr };
  const jsonForm = stations;
  res.send(jsonForm);
});

async function getStationStops(station: string) {
  const stations = JSON.parse(
    (await fs.readFileSync(`./stanice/${station}.json`)).toString()
  );
  return stations;
}

function convertToDate(time: string) {
  console.log(time);
  var now = new Date();
  var nowDateTime = now.toISOString();
  var nowDate = nowDateTime.split("T")[0];
  var target = new Date(nowDate + "T" + time);
  return target;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}
// async function loadStations() {
// const stationsNames = (await getStationsFromFile()) as string[];
router.get("/:name/:time", async (req, res) => {
  const stationName = req.params.name; //naziv stanice
  const time = convertToDate(req.params.time);
  console.log(stationName);
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");\
  const station_info = await getStationStops(stationName);
  console.log(time);
  const future = addMinutes(time, 10);
  const past = addMinutes(time, -10);
  const newDepartureA: Station[] = [];
  const newDepartureB: Station[] = [];
  station_info.busDepartureA.map((station: any) => {
    const dateTime = convertToDate(station.time);
    if (dateTime >= past && dateTime <= future) {
      newDepartureA.push(station);
    }
    return station;
  });
  console.log(future, past);
  station_info.busDepartureB.map((station: any) => {
    const dateTime = convertToDate(station.time);
    if (dateTime >= past && dateTime <= future) {
      newDepartureB.push(station);
    }
    return station;
  });
  console.log("ALOOO", newDepartureA, newDepartureB);
  const obj = { busDepartureA: newDepartureA, busDepartureB: newDepartureB };
  console.log(obj);
  res.send(obj);
});
// }
// loadStations();
export default router;
