export type TLine = {
  lineId: number;
  lineIndex: string;
  lineName: string;
};

export type TDeparture = {
  departureId: number;
  departureTime: string;
  routeName: string;
};

export type Stop = {
  stanceId: number;
  stanceIndex: string;
  stanceName: string;
  stopTime: string;
};

export type TTrips = {
  departureId: number;
  startPoint: string;
  endPoint: string;
  stops: Stop[];
};
export type TLineDepartures = {
  busLineId: string;
  busDepartureA: TDeparture[];
  busDepartureB: TDeparture[];
};

export type StationsByDeparture = {
  busLineId: string;
  busDepartureA: TTrips[];
  busDepartureB: TTrips[];
};

export type Stations = {
  staniceA: string[];
  staniceB: string[];
};

export type StationByDeparture = {
  busDepartureA: Station[];
  busDepartureB: Station[];
};
export type Station = {
  busLineId: string;
  time: string;
  direction: string;
};

export enum Day {
  workday = "work_day",
  saturday = "saturday",
  sunday = "sunday",
}

export type stationJSON = {
  stations: string[];
};
