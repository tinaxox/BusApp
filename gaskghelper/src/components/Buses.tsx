import { X } from "lucide-react";
import { useState } from "react";

interface BusesProps {
  buses: Departures | null;
  station: string;
}
interface BusProps {
  departure: Bus;
}
function Bus({ departure }: BusProps) {
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalActive(true)}
        className="bg-white py-2 px-3 min-w-[100px] min-h-[70px] text-lg font-semibold shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        {departure.busLineId}
      </button>
      {modalActive && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-40 backdrop-filter backdrop-blur-sm">
          <div className="p-6 rounded-xl justify-center items-center min-w-[400px] min-h-[300px] bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] relative">
            <button
              onClick={() => setModalActive(false)}
              className="absolute top-4 right-4"
            >
              <X size={36} />
            </button>
            <div className="p-4 flex flex-col pt-10 justify-center items-center gap-8 min-h-[200px]">
              <h2 className="text-3xl font-bold">{departure.busLineId}</h2>
              <p className="text-2xl font-semibold">{departure.direction}</p>
              <p className="text-2xl mt-auto">{departure.time}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface DepartureProps {
  buses: Bus[];
}
function Departure({ buses }: DepartureProps) {
  console.log("BUSES", buses);
  return (
    <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
      {buses.map((departure) => {
        return (
          <li key={`li${departure.busLineId + departure.time}`}>
            <Bus
              key={departure.busLineId + departure.time}
              departure={departure}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function Buses({ buses, station }: BusesProps) {
  console.log("ovdeeee", buses);
  return (
    <>
      {buses && (
        <div className="flex flex-col gap-10 p-8 pt-24 justify-center items-center">
          <div className="p-6 flex flex-col gap-8 w-full min-w-[400px] min-h-[200px] justify-center items-center rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <h2 className="text-2xl font-bold">Bus Departure A</h2>
            {buses.busDepartureA.length > 0 ? (
              <Departure
                buses={buses.busDepartureA}
                key={`busDepartureA${station}`}
              />
            ) : (
              <p className="text-2xl text-neutral-600">No buses to list.</p>
            )}
          </div>
          <div className="p-6 flex flex-col gap-8 min-w-[400px] min-h-[200px] justify-center items-center rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <h2 className="text-2xl font-bold">Bus Departure B</h2>
            {buses.busDepartureB.length > 0 ? (
              <Departure
                buses={buses.busDepartureB}
                key={`busDepartureA${station}`}
              />
            ) : (
              <p className="text-2xl text-neutral-600">No buses to list.</p>
            )}
          </div>
        </div>
      )}
      {!buses && <p>No buses to show for this station.</p>}
    </>
  );
}
