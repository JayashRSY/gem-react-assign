// src/components/FlightCard.tsx
import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaClock } from "react-icons/fa";

interface Flight {
  id: number;
  name: string;
  departureTime: string;
  arrivalTime: string;
  flightHours: number;
  price: number;
  start: string;
  end: string;
  totalTime: string;
  refundPolicy: string;
  noCostEMI: boolean;
  logo: string;
}

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border p-6 m-4 hover:shadow-xl transition-shadow duration-300">
      {/* Airline Logo */}
      <div className="flex mb-4 items-center">
        <img
          src={flight.logo}
          alt={`${flight.name} logo`}
          className="w-24 h-24 object-contain"
        />
        {/* Flight Name */}
        <div className="text-2xl font-bold text-gray-800 mb-4 ml-4">
          {flight.name}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        {/* Flight Start and End Locations */}
        <div className="w-full md:w-3/5 flex justify-between items-center mb-4">
          <div className="">
            <div className="text-xl font-semibold text-gray-800 flex items-center">
              <FaPlaneDeparture className="text-orange-500 mr-2" />{" "}
              {flight.start}
            </div>
            <div className="flex items-center">
              <FaClock className="text-orange-500 mr-2" /> Departure:{" "}
              {flight.departureTime}
            </div>
          </div>
          <div>{flight.totalTime}</div>
          <div>
            <div className="text-xl font-semibold text-gray-800 flex items-center">
              {flight.end} <FaPlaneArrival className="text-orange-500 ml-2" />
            </div>
            <div className="flex items-center">
              <FaClock className="text-orange-500 mr-2 " /> Arrival:{" "}
              {flight.arrivalTime}
            </div>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="w-full md:w-2/5 flex justify-end items-center mt-4">
          <div className="text-lg font-bold text-orange-600 m-6">
            ₹{flight.price}
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
