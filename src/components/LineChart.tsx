import Plot from "react-plotly.js";
import { FC } from "react";
import { Data } from "plotly.js";

type LineChartProps = {
  dates: string[];
  totalCases: number[];
  activeCases: number[];
  recovered: number[];
  deaths: number[];
};

const LineChart: FC<LineChartProps> = ({
  dates,
  totalCases,
  activeCases,
  recovered,
  deaths,
}) => {
  const data: Data[] = [
    {
      x: dates,
      y: totalCases,
      type: "scatter",
      mode: "lines",
      name: "Total Cases",
      line: { color: "#3b82f6" },
    },
    {
      x: dates,
      y: activeCases,
      type: "scatter",
      mode: "lines",
      name: "Active Cases",
      line: { color: "#facc15" },
    },
    {
      x: dates,
      y: recovered,
      type: "scatter",
      mode: "lines",
      name: "Recovered",
      line: { color: "#22c55e" },
    },
    {
      x: dates,
      y: deaths,
      type: "scatter",
      mode: "lines",
      name: "Deaths",
      line: { color: "#ef4444" },
    },
  ];

  return (
    <div className="w-full h-full">
      <Plot
        data={data}
        layout={{
          title: {
            text: "COVID-19 Cases Over Time",
            font: {
              size: 18,
              color: "#333",
            },
            x: 0.5,
            xanchor: "center",
          },
          height: 350,
          width: 600, // Set width as a number
          margin: { t: 50, b: 50, l: 40, r: 20 }, // Adjust margins to fit the title
          legend: {
            orientation: "h",
            x: 0.35,
            y: -0.35,
            xanchor: "center",
            yanchor: "bottom",
            font: { size: 12 },
          },
          xaxis: {
            title: "Date",
            showgrid: false,
            type: "date", // Explicitly set the x-axis to be of type 'date'
          },
          yaxis: {
            title: "Number of Cases",
            showgrid: true,
          },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
        }}
        config={{
          responsive: true,
          displayModeBar: false,
        }}
      />
    </div>
  );
};

export default LineChart;
