import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { appData } from "@/store/slices/appSlice";
import { useAppSelector } from "@/store/hooks";

const Chart = ({ status }: { status: number }) => {
  const { dataStatistics } = useAppSelector(appData);
  const istData = dataStatistics.mostOrderedMenu.map((item) => {
    const returnValue = { name: item.name, y: item.quantity };
    return returnValue;
  });
  const months = [
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
  ];
  const column = {
    chart: {
      type: "column",
    },
    title: {
      text: "Data Statistics",
    },
    xAxis: {
      categories: months,
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

  const pie = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Most ordered",
    },

    plotOptions: {
      pie: {
        innerSize: "50%", // Makes it a donut chart
        depth: 45, // Adds 3D effect (optional)
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
        },
      },
    },
    series: [
      {
        name: "Qty",
        data: istData,
      },
    ],
  };

  console.log(istData);

  return (
    <div>
      {status === 1 && (
        <HighchartsReact highcharts={Highcharts} options={column} />
      )}
      {status === 1 && (
        <HighchartsReact highcharts={Highcharts} options={pie} />
      )}
      {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
    </div>
  );
};

export default Chart;
