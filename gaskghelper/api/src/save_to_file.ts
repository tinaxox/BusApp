import axios from "axios";
var fs = require("fs");
import {
  TLine,
  TLineDepartures,
  Day,
  StationsByDeparture,
  Station,
  StationByDeparture,
} from "./types";
import { stat } from "fs";
export async function saveLinesToFile(lines: TLine[]) {
  fs.writeFileSync("./busevi/allLines.json", JSON.stringify(lines));
}
export async function saveBusesToFile(
  bus: TLineDepartures,
  busLineId: string,
  day: Day
) {
  await fs.writeFile(
    "./busevi/" + day + "/" + busLineId + "_" + day + ".json",
    JSON.stringify(bus)
  );
}
export async function saveBusTripToFile(
  trips: StationsByDeparture,
  busLineId: string,
  day: Day
) {
  await fs.appendFile(
    "./stanice_buseva/stanice_" +
      day +
      "/stanice_" +
      busLineId +
      "_" +
      day +
      ".json",
    JSON.stringify(trips)
  );
}
export async function saveStationToFile(
  station: Station,
  day: Day,
  stationName: string,
  way: string
) {
  var fileName: string = stationName + "_" + day + ".json";
  if (fileName.includes("/")) {
    fileName = fileName.replaceAll("/", "");
  }
  if (fileName.includes(" ")) {
    fileName = fileName.replaceAll(" ", "_");
  }
  var data: StationByDeparture = {
    busDepartureA: [],
    busDepartureB: [],
  };
  if (fs.existsSync("./stanice/" + fileName)) {
    data = JSON.parse(
      fs.readFileSync("./stanice/" + fileName)
    ) as StationByDeparture;
  }
  var stations: StationByDeparture;
  stations = data;

  if (way === "A") {
    stations.busDepartureA.push(station);
  }
  if (way === "B") {
    stations.busDepartureB.push(station);
  }
  fs.writeFileSync("./stanice/" + fileName, JSON.stringify(stations));
}
export async function saveStationsToFile(stations: string[]) {
  fs.writeFileSync("./src/stations_names.json", JSON.stringify(stations));
}
