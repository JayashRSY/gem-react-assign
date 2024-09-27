// src/components/MainView.tsx
import { useState } from "react";
import flightsData from "../data/flights";
import FlightCard from "./FlightCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortData = (flights: any[], filters: string[]) => {
  return flights.sort((a, b) => {
    // eslint-disable-next-line prefer-const
    for (let filter of filters) {
      if (filter === "price" && a.price !== b.price) {
        return a.price - b.price;
      } else if (filter === "flightTime" && a.flightTime !== b.flightTime) {
        return a.flightTime.localeCompare(b.flightTime);
      } else if (filter === "flightHours" && a.flightHours !== b.flightHours) {
        return a.flightHours - b.flightHours;
      }
    }
    return 0;
  });
};

const MainView = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const sortedFlights = sortData(flightsData, filters);

  const handleFilter = (filter: string) => {
    setFilters([...filters, filter]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 text-center">Flight Information</h1>
      <div className="p-4 m-4">
        <div>
          <div className="bg-white text-left text-gray-800 flex justify-evenly m-4 mb-6">
            <div
              className="px-6 py-4 cursor-pointer"
              onClick={() => handleFilter("departure")}
            >
              Departure
            </div>
            <div
              className="px-6 py-4 cursor-pointer"
              onClick={() => handleFilter("duration")}
            >
              Duration
            </div>
            <div
              className="px-6 py-4 cursor-pointer"
              onClick={() => handleFilter("arrival")}
            >
              Arrival
            </div>
            <div
              className="px-6 py-4 cursor-pointer"
              onClick={() => handleFilter("price")}
            >
              Price
            </div>
          </div>
        </div>
        <div>
          {sortedFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainView;
