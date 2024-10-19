"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { setSelectedState } from "@/redux/slices/covidSlice";
import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";
import MapView from "@/components/MapView";

export default function Home() {
  const dispatch = useAppDispatch();
  const { covidData, selectedState } = useAppSelector((state) => state.covid);
  const {
    total_cases: totalCases,
    active_cases: activeCases,
    total_recovered: recovered,
    total_deaths: deaths,
  } = selectedState.summary;

  const { daily_data } = selectedState;

  // Extract the data for the line chart
  const dates = daily_data.map((day) => day.date);
  const totalCasesLine = daily_data.map((day) => day.new_cases);
  const activeCasesLine = daily_data.map((day) => day.active_cases);
  const recoveredLine = daily_data.map((day) => day.recovered);
  const deathsLine = daily_data.map((day) => day.deaths);

  return (
    <div className="mx-auto max-w-screen-md xl:max-w-full grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 h-screen bg-gray-50">
      {/* First Column - State List */}
      <div
        aria-label="List of Indian States"
        className="col-span-1 xl:col-span-2 bg-white p-6 rounded-lg shadow-md max-h-[calc(100vh-2.5rem)]"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">States</h2>
        <ul
          className="space-y-3 max-h-[95%] overflow-y-scroll"
          role="listbox"
          aria-labelledby="state-list"
        >
          {covidData.states.map((ele) => {
            return (
              <li
                key={ele.id}
                role="option"
                aria-selected={selectedState.id === ele.id}
              >
                <button
                  onClick={() => dispatch(setSelectedState(ele))}
                  className={`${
                    selectedState.id === ele.id
                      ? "bg-indigo-100 border border-indigo-300 text-indigo-800 hover:bg-indigo-100"
                      : "bg-slate-100 border border-slate-300 hover:bg-blue-100"
                  } w-full p-3 text-lg duration-200 ease-in-out rounded-lg cursor-pointer text-left`}
                  aria-pressed={selectedState.id === ele.id}
                >
                  {ele.state}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Second Column-Map section*/}
      <section
        aria-labelledby="stats-section"
        className="col-span-1 xl:col-span-6 flex flex-col bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <h2
            id="stats-section"
            className="text-xl font-semibold mb-4 text-gray-800"
          >
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
        <div className="bg-gray-100 min-h-[500px] grow p-6 rounded-lg shadow-sm">
          <MapView states={covidData.states} selectedState={selectedState} />
        </div>
      </section>

      {/* Third Column - Pie Chart and Line Chart */}
      <section
        aria-labelledby="charts-section"
        className="col-span-1 xl:col-span-4 bg-white xl:max-h-screen xl:overflow-hidden p-6 rounded-lg shadow-md flex flex-col justify-between"
      >
        <div className="h-1/2">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Pie Chart
          </h2>
          <div className="overflow-scroll flex justify-center items-center p-6 rounded-lg shadow-sm text-lg">
            <PieChart
              activeCases={activeCases}
              recovered={recovered}
              deaths={deaths}
            />
          </div>
        </div>

        <div className="h-1/2">
          <h2 className="text-xl font-semibold my-4 text-gray-800">
            Line Chart
          </h2>
          <div className="bg-gra-100 overflow-scroll flex justify-center items-center p-6 rounded-lg shadow-sm text-lg">
            <LineChart
              dates={dates}
              totalCases={totalCasesLine}
              activeCases={activeCasesLine}
              recovered={recoveredLine}
              deaths={deathsLine}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
