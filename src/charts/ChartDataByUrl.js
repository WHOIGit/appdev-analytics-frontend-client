import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function ChartDataByUrl({ siteData, chartHeight }) {
  console.log(siteData);
  const chartData = [{ id: "Daily Downloads", data: [] }];
  chartData[0].data = siteData.total_daily_download_results.map(item => {
    // convert bytes to MB
    const point = {
      x: item.date,
      y: item.bytes_sent / 1e6
    };
    return point;
  });

  const groups = siteData.download_results.reduce((groups, item) => {
    const group = groups[item.url] || [];
    group.push(item);
    groups[item.url] = group;
    return groups;
  }, {});

  for (let [key, value] of Object.entries(groups)) {
    console.log(key, value);
  }

  return (
    <div style={chartHeight} className="App">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
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
      />
    </div>
  );
}
