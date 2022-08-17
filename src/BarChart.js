import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import data from "./db.json";
import { useState } from "react";
function BarChart() {
  const [socialFirst, setsocialFirst] = useState();

  const [socialSecond, setsocialSecond] = useState();
  useEffect(() => {
    const selectChart = () => {
      //creating two arryas to put the values of alcohol and malic acid of all class.
      let alcoholName = [];
      let malicacidName = [];
      //pushing values of alcohol and malic acid of all class in the arrays.
      data.forEach((element) => {
        alcoholName.push(element.Alcohol);
        malicacidName.push(element.Malicacid);
      });
      //separating each class in a separate array to calculate the average of malic acid for each class.
      let p1 = malicacidName.slice(0, 59);
      let p2 = malicacidName.slice(59, 130);
      let p3 = malicacidName.slice(130);
      //separating each class of alcohol in a separate array
      let v1 = alcoholName.slice(0, 59);
      let v2 = alcoholName.slice(59, 130);
      let v3 = alcoholName.slice(130);
      //calculating the average of malic acid of each class.
      const getAvg = (array) => {
        const avg =
          array.reduce((sum, curr) => sum + Number(curr), 0) / array.length;
        return parseFloat(avg).toFixed(3);
      };
      //putting average of malic acid of each class in a separate array,
      let p4 = [getAvg(p1), getAvg(p2), getAvg(p3)];
      //putting alcohol class in a separate array,
      let v4 = [v1, v2, v3];

      setsocialFirst(p4);
      setsocialSecond(v4);
    };

    selectChart();
  }, []);
  // creating options for using in ReactEChart.
  const options = {
    title: {
      text: "Barchart between Alcohol and Malic Acid Average",
    },

    tooltip: {
      trigger: "axis",
    },
    grid: {},
    xAxis: [
      {
        type: "category",
        data: socialSecond,
        name: "Alcohol",

        nameLocation: "center",
        nameTextStyle: { fontSize: 20, padding: 20 },
        axisLabel: {
          width: 50,
          overflow: "truncate",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Malic Acid Average",
        nameLocation: "center",
        nameTextStyle: { fontSize: 20, padding: 15 },
      },
    ],
    series: [
      {
        type: "bar",

        data: socialFirst,
      },
    ],
  };

  return (
    <div>
      <div>
        <ReactECharts option={options} />
      </div>
    </div>
  );
}
export default BarChart;
