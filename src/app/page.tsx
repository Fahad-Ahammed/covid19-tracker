"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";

export default function Home() {
  const dispatch = useAppDispatch();
  const states = useAppSelector((state) => state.covid.covidData);

  return (
    <div className="container mx-auto max-w-screen-md xl:max-w-full grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 h-screen bg-gray-50">
      {/* First Column - State List */}
      <div className="col-span-1 xl:col-span-2 bg-white p-6 rounded-lg shadow-md max-h-[calc(100vh-2.5rem)]">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">States</h2>
        <ul className="space-y-3 max-h-[95%] overflow-y-scroll">
          {states.map((state) => {
            return (
              <li
                key={state.id}
                className="bg-gray-100 p-3 rounded-lg hover:bg-blue-100 cursor-pointer"
              >
                {state.state}
              </li>
            );
          })}

        </ul>
      </div>

      {/* Second Column */}
      <div className="col-span-1 xl:col-span-7 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Stats</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center shadow-sm">
              Total Cases
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center shadow-sm">
              Active Cases
            </div>
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center shadow-sm">
              Recovered
            </div>
            <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center shadow-sm">
              Deaths
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h1 className="text-gray-800 text-center">Map</h1>
        </div>
      </div>

      {/* Third Column */}
      <div className="col-span-1 xl:col-span-3 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Pie Chart
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            Chart Area
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Line Chart
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            Chart Area
          </div>
        </div>
      </div>
    </div>
  );
}
