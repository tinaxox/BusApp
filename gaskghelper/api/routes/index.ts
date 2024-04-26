import { Router } from "express";
import { getStationsFromFile } from "../src/get_from_file";
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

// async function loadStations() {
// const stationsNames = (await getStationsFromFile()) as string[];
router.get("/:name", async (req, res) => {
  const stationName = req.params.name; //naziv stanice
  console.log(stationName);
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");\
  const station_info = await getStationStops(stationName);
  console.log(station_info);
  res.send(station_info);
});
// }
// loadStations();
export default router;
