import Plot from "react-plotly.js";
import { FC } from "react";

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
  const data = [
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
      line: { color: "#22c55e" }, // Green for Recovered
    },
    {
      x: dates,
      y: deaths,
      type: "scatter",
      mode: "lines",
      name: "Deaths",
      line: { color: "#ef4444" }, // Red for Deaths
    },
  ];

  return (
    <div className="w-full h-full">
      <Plot
        data={data}
        layout={{
          height: 350, 
          width: "100%",
          margin: { t: 0, b: 0, l: 0, r: 0 },
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
