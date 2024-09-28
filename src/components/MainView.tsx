// src/components/MainView.tsx
import { useState } from "react";
import { flightsData } from "../data/flights";
import FlightCard from "./FlightCard";
import { IFlight } from "../types/flight";

const sortData = (
  flights: IFlight[],
  filters: { filter: string; order: string }[]
) => {
  return flights.sort((a, b) => {
    let comparison = 0;
    for (const { filter, order } of filters) {
      if (filter === "price") {
        comparison = a.price - b.price;
      } else if (filter === "departureTime") {
        comparison = a.departureTime.localeCompare(b.departureTime);
      } else if (filter === "arrivalTime") {
        comparison = a.arrivalTime.localeCompare(b.arrivalTime);
      } else if (filter === "flightHours") {
        comparison = a.flightHours - b.flightHours;
      }

      if (comparison !== 0) {
        return order === "asc" ? comparison : -comparison;
      }
    }
    return 0;
  });
};

const MainView = () => {
  const [filters, setFilters] = useState<
    { filter: string; order: string; count: number }[]
  >([]);

  const sortedFlights = sortData(flightsData, filters);

  const handleFilter = (filter: string) => {
    setFilters((prev) => {
      const existingFilterIndex = prev.findIndex((f) => f.filter === filter);
      if (existingFilterIndex !== -1) {
        const updatedFilters = [...prev];
        const currentCount = updatedFilters[existingFilterIndex].count + 1;

        if (currentCount >= 3) {
          return updatedFilters.filter(
            (_, index) => index !== existingFilterIndex
          );
        } else {
          updatedFilters[existingFilterIndex] = {
            filter,
            order: currentCount % 2 === 0 ? "desc" : "asc",
            count: currentCount,
          };
          return updatedFilters;
        }
      } else {
        return [...prev, { filter, order: "asc", count: 1 }];
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl sm:text-3xl mb-4 text-center">
        Flight Information
      </h1>
      <div className="p-2 sm:p-4 m-2 sm:m-4">
        <div>
          <div className="bg-white text-left text-gray-800 flex flex-wrap justify-around m-2 sm:m-4 mb-4 sm:mb-6">
            {["departureTime", "flightHours", "arrivalTime", "price"].map(
              (filter) => (
                <div
                  key={filter}
                  className={`px-2 sm:px-6 py-2 sm:py-4 cursor-pointer flex items-center ${
                    filters.some((f) => f.filter === filter)
                      ? "text-blue-600"
                      : ""
                  }`}
                  onClick={() => handleFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  {filters.some((f) => f.filter === filter) && (
                    <span className="ml-1 sm:ml-2">
                      {filters.find((f) => f.filter === filter)?.order === "asc"
                        ? "↑"
                        : "↓"}
                    </span>
                  )}
                </div>
              )
            )}
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
