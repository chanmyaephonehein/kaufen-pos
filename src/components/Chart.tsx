import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ status }: { status: number }) => {
  const lineChart = "line";
  const barChart = "bar";
  const columnChart = "column";
  const pieChart = "pie";
  const heatMap = "heatmap";
  const funnelChart = "funnel";
  const guageChart = "guage";

  const areaChart = "area";
  const scatterPlot = "scatter";
  const histogram = "histogram";
  const bubbleChart = "bubble";

  const options = {
    chart: {
      type: columnChart,
    },
    title: {
      text: "Data Statistics",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Revenue",
      },
    },
    series: [
      {
        name: "Example Series",
        data: [
          0.23, 0.12, 0.31, 0.41, 0.68, 0.58, 0.76, 0.78, 0.89, 1.44, 0.99, 1.2,
        ],
      },
      {
        name: "Example Series",
        data: [
          0.03, 0.12, 0.09, 0.34, 0.28, 0.21, 0.34, 1.09, 0.69, 0.76, 0.89,
          1.01,
        ],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <HighchartsReact highcharts={Highcharts} options={options} />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
