type Bus = {
  busLineId: number;
  time: string;
  direction: string;
};

type Departures = {
  busDepartureA: Bus[];
  busDepartureB: Bus[];
};
