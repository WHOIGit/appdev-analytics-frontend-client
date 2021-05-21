import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function ChartDataByUrl({ siteData, chartHeight }) {
  console.log(siteData);
  const chartData = [];

  const groups = siteData.download_results.reduce((groups, item) => {
    if (item.url.includes("services")) {
      const group = groups[item.url] || [];
      group.push(item);
      groups[item.url] = group;
    }
    return groups;
  }, {});

  for (let [key, value] of Object.entries(groups)) {
    const dataRow = { id: key, data: [] };
    dataRow.data = value.map(item => {
      // convert bytes to MB
      const point = {
        x: item.date,
        y: item.bytes_sent / 1e6
      };
      return point;
    });
    chartData.push(dataRow);
  }
  console.log(chartData);

  return (
    <div style={chartHeight} className="App">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d"
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "MBs downloaded",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        axisBottom={{
          format: "%b %d",
          tickValues: "every 2 days",
          // tickRotation: -90,
          // legend: "time scale",
          legendOffset: -12
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}
