// src/components/MainView.tsx
import { useState } from "react";
import { flightsData } from "../data/flights";
import FlightCard from "./FlightCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flights: any[],
  filters: { filter: string; order: string }[]
) => {
  return flights.sort((a, b) => {
    let comparison = 0;
    for (const { filter, order } of filters) {
      if (filter === "price") {
        comparison = a.price - b.price;
      } else if (filter === "flightTime") {
        comparison = a.flightTime.localeCompare(b.flightTime);
      } else if (filter === "flightHours") {
        comparison = a.flightHours - b.flightHours;
      }

      if (comparison !== 0) {
        return order === "asc" ? comparison : -comparison;
      }
    }
    return 0; // If all comparisons are equal
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
        // If filter exists, increment its count
        const updatedFilters = [...prev];
        const currentCount = updatedFilters[existingFilterIndex].count + 1;

        if (currentCount >= 3) {
          // If count reaches 3, remove the filter
          return updatedFilters.filter(
            (_, index) => index !== existingFilterIndex
          );
        } else {
          // Update the count and toggle the order
          updatedFilters[existingFilterIndex] = {
            filter,
            order: currentCount % 2 === 0 ? "desc" : "asc",
            count: currentCount,
          };
          return updatedFilters;
        }
      } else {
        // If filter does not exist, add it with ascending order and count of 1
        return [...prev, { filter, order: "asc", count: 1 }];
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 text-center">Flight Information</h1>
      <div className="p-4 m-4">
        <div>
          <div className="bg-white text-left text-gray-800 flex justify-evenly m-4 mb-6">
            {[
              "departure",
              "duration",
              "arrival",
              "price",
              "flightTime",
              "flightHours",
            ].map((filter) => (
              <div
                key={filter}
                className={`px-6 py-4 cursor-pointer flex items-center ${
                  filters.some((f) => f.filter === filter)
                    ? "text-blue-600"
                    : ""
                }`}
                onClick={() => handleFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filters.some((f) => f.filter === filter) && (
                  <span className="ml-2">
                    {filters.find((f) => f.filter === filter)?.order === "asc"
                      ? "↑"
                      : "↓"}
                  </span>
                )}
              </div>
            ))}
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
