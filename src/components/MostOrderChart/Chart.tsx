import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { appData } from "@/store/slices/appSlice";
import { useAppSelector } from "@/store/hooks";

const Chart = ({ status }: { status: number }) => {
  const { dataStatistics } = useAppSelector(appData);
  const istData = dataStatistics.mostOrderedMenuByNumber.map((item) => {
    const returnValue = { name: item.name, y: item.quantity };
    return returnValue;
  });

  const column = {
    chart: {
      type: "column",
    },
    title: {
      text: "Data Statistics",
    },
    xAxis: {
      categories: istData.map((item) => {
        return item.name;
      }),
    },
    yAxis: {
      title: {
        text: "Quantity",
      },
    },
    series: [
      {
        name: "Menu Qtys",
        data: istData,
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

  return (
    <div>
      {" "}
      <HighchartsReact highcharts={Highcharts} options={pie} />
      <HighchartsReact highcharts={Highcharts} options={column} />
      {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
    </div>
  );
};

export default Chart;
