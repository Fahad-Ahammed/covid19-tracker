import Plot from "react-plotly.js";
import { FC } from "react";

type PieChartProps = {
  activeCases: number;
  recovered: number;
  deaths: number;
};

const PieChart: FC<PieChartProps> = ({ activeCases, recovered, deaths }) => {
  const data = [
    {
      values: [activeCases, recovered, deaths],
      labels: ["Active Cases", "Recovered", "Deaths"],
      type: "pie",
      hoverinfo: "label+percent",
      textinfo: "none",
      marker: {
        colors: ["#fef08a", "#86efac", "#fca5a5"],
      },
    },
  ];

  return (
    <Plot
      data={data}
      layout={{
        height: 350,
        width: 350,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        showlegend: true,
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        hoverlabel: {
          bgcolor: "white",
          bordercolor: "black",
          font: { size: 12 },
        },
        legend: {
          orientation: "h",
          x: 0.5,
          xanchor: "center",
          y: -0.2,
        },
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
    />
  );
};

export default PieChart;
