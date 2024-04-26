import { Day, TLineDepartures, TLine, StationsByDeparture } from "./types";
var fs = require("fs");

export async function getBusesFromFile(lines: TLine[], day: Day) {
  const buses: TLineDepartures[] = [];
  for (let line of lines) {
    const fileName =
      "./busevi/" + day + "/" + line.lineIndex + "_" + day + ".json";
    if (fs.existsSync(fileName)) {
      console.log("File exists.\n");
      const bus = JSON.parse(
        (await fs.readFileSync(fileName)).toString()
      ) as TLineDepartures;
      buses.push(bus);
    }
  }
  return buses;
}

export async function getTripsFromFile(day: Day, lines: TLine[]) {
  const trips: StationsByDeparture[] = [];
  for (let line of lines) {
    const fileName =
      "./stanice_buseva/stanice_" +
      day +
      "/" +
      "stanice_" +
      line.lineIndex +
      "_" +
      day +
      ".json";
    if (fs.existsSync(fileName)) {
      const trip = JSON.parse(
        (await fs.readFileSync(fileName)).toString()
      ) as StationsByDeparture;
      trips.push(trip);
    }
  }
  return trips;
}

export async function getStationsFromFile() {
  const stations = JSON.parse(
    (await fs.readFileSync("./src/stations_names.json")).toString()
  );
  return stations;
}
