"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { setSelectedState } from "@/redux/slices/covidSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { covidData, selectedState } = useAppSelector((state) => state.covid);
  const { totalCases, activeCases, recovered, deaths } = selectedState;

  return (
    <div className="mx-auto max-w-screen-md xl:max-w-full grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 h-screen bg-gray-50">
      {/* First Column - State List */}
      <nav
        aria-label="List of Indian States"
        className="col-span-1 xl:col-span-2 bg-white p-6 rounded-lg shadow-md max-h-[calc(100vh-2.5rem)]"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">States</h2>
        <ul
          className="space-y-3 max-h-[95%] overflow-y-scroll"
          role="listbox"
          aria-labelledby="state-list"
        >
          {covidData.map((state) => {
            return (
              <li key={state.id} role="option" aria-selected={selectedState.id === state.id}>
                <button
                  onClick={() => dispatch(setSelectedState(state))}
                  className={`${
                    selectedState.id === state.id
                      ? "bg-indigo-100 border border-indigo-300 text-indigo-800 hover:bg-indigo-100"
                      : "bg-slate-100 border border-slate-300 hover:bg-blue-100"
                  } w-full p-3 text-lg duration-200 ease-in-out rounded-lg cursor-pointer text-left`}
                  aria-pressed={selectedState.id === state.id}
                >
                  {state.state}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Second Column */}
      <section
        aria-labelledby="stats-section"
        className="col-span-1 xl:col-span-7 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <h2 id="stats-section" className="text-xl font-semibold mb-4 text-gray-800">
            Stats
          </h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 font-[700]">
            <div className="bg-blue-100 flex flex-col text-blue-800 p-4 rounded-lg text-center shadow-sm text-xl">
              <span>Total Cases</span>
              <span>{totalCases}</span>
            </div>
            <div className="bg-yellow-100 flex flex-col text-yellow-800 p-4 rounded-lg text-center shadow-sm text-xl">
              <span>Active Cases</span>
              <span>{activeCases}</span>
            </div>
            <div className="bg-green-100 flex flex-col text-green-800 p-4 rounded-lg text-center shadow-sm text-xl">
              <span>Recovered</span>
              <span>{recovered}</span>
            </div>
            <div className="bg-red-100 flex flex-col text-red-800 p-4 rounded-lg text-center shadow-sm text-xl">
              <span>Deaths</span>
              <span>{deaths}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Map</h1>
        </div>
      </section>

      {/* Third Column */}
      <section
        aria-labelledby="charts-section"
        className="col-span-1 xl:col-span-3 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Pie Chart
          </h2>
          <div
            className="bg-gray-100 p-6 rounded-lg text-center shadow-sm text-lg"
            aria-label="Pie Chart Placeholder"
          >
            Chart Area
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Line Chart</h2>
          <div
            className="bg-gray-100 p-6 rounded-lg text-center shadow-sm text-lg"
            aria-label="Line Chart Placeholder"
          >
            Chart Area
          </div>
        </div>
      </section>
    </div>
  );
}
