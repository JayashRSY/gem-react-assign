// src/components/FlightCard.tsx
import React, { useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { IFlight } from "../types/flight";


interface FlightCardProps {
  flight: IFlight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

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
          <div>
            <div className="text-md font-semibold text-gray-800 flex items-center">
              <FaPlaneDeparture className="text-orange-500 mr-2" />
              <div className="text-xl">{flight.startCode}</div>, {flight.start}
            </div>
            <div className="flex items-center  text-xl font-bold">
              <FaClock className="text-orange-500 mr-2" />
              {flight.departureTime}
            </div>
          </div>
          <div className="font-bold">{flight.totalTime}</div>
          <div>
            <div className="text-xl font-semibold text-gray-800 flex items-center">
              <div className="text-xl">{flight.endCode}</div>, {flight.end}
              <FaPlaneArrival className="text-orange-500 ml-2" />{" "}
              {/* Display end code */}
            </div>
            <div className="flex items-center text-xl font-bold">
              <FaClock className="text-orange-500 mr-2" /> {flight.arrivalTime}
            </div>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="w-full md:w-2/5 flex justify-end items-center mt-4">
          <div className="m-6">
            <div className="text-lg font-bold text-orange-600">
              ₹{flight.price}
            </div>
            <div className="text-lg font-bold text-gray-600">
              EMI: ₹{flight.emiPrice} {/* Display EMI price */}
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>

      {/* Collapsible Flight Details Section */}
      <div>
        <div className="flex items-center justify-end text-gray-600 mt-4 w-full">
          <span
            onClick={toggleDetails}
            className="mr-2 text-blue-500 flex items-center font-bold hover:cursor-pointer"
          >
            Flight Details
            <span className="m-2">
              {isDetailsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </span>
        </div>
        {isDetailsOpen && (
          <div className="mt-4 p-4 border-t border-gray-200">
            <p className="text-gray-700">
              Refund Policy: {flight.refundPolicy}
            </p>
            <p className="text-gray-700">
              No Cost EMI: {flight.noCostEMI ? "Available" : "Not Available"}
            </p>
            {/* Add more flight details here if necessary */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
