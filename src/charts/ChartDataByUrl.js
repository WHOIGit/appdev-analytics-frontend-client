import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tooltip: {
    background: "white",
    color: "inherit",
    fontSize: "inherit",
    borderRadius: "2px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
    padding: "5px 9px"
  }
}));

export default function ChartDataByUrl({ siteData, dataMetric, chartHeight }) {
  const classes = useStyles();
  let yAxisLabel = "MBs Downloaded";
  if (dataMetric === "hits") {
    yAxisLabel = "Hits";
  }

  let tooltipLabel = "MB";
  if (dataMetric === "hits") {
    tooltipLabel = "Hits";
  }
  // format API data for chart dispaly
  const chartData = [];
  // Group the data by URL to create different time series
  const groups = siteData.download_results.reduce((groups, item) => {
    const group = groups[item.url] || [];
    group.push(item);
    groups[item.url] = group;

    return groups;
  }, {});
  // iterate through the time series objects to calculate total_data for sorting,
  // then format chartData rows for Nivo chart
  for (let [key, value] of Object.entries(groups)) {
    const dataRow = { id: key, total_data: 0, data: [] };
    // Get total bytes sent
    dataRow.total_data = value
      .map(item => {
        let data = item[dataMetric];
        // convert bytes to MB if "bytes_sent"
        if (dataMetric === "bytes_sent") {
          data = Math.round(data / 1e6);
        }
        return data;
      })
      .reduce((a, b) => a + b, 0);

    dataRow.data = value.map(item => {
      let data = item[dataMetric];
      // convert bytes to MB if "bytes_sent"
      if (dataMetric === "bytes_sent") {
        data = Math.round(data / 1e6);
      }
      const date = new Date(item.date);
      console.log(data);
      const point = {
        x: date,
        y: data
      };
      return point;
    });
    chartData.push(dataRow);
  }
  // sort array to get top download URLs
  chartData.sort((a, b) => (a.total_data < b.total_data ? 1 : -1));
  console.log(chartData);
  // get top N download urls
  const slicedChartData = chartData.slice(0, 10).reverse();

  return (
    <div style={chartHeight} className="App">
      <ResponsiveLine
        data={slicedChartData}
        margin={{ top: 20, right: 20, bottom: 190, left: 60 }}
        xScale={{
          type: "time"
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
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
          legend: yAxisLabel,
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
        tooltip={input => {
          return (
            <div className={classes.tooltip}>
              URL: <strong>{input.point.serieId}</strong> <br />
              Data:{" "}
              <strong>
                {Math.round(input.point.data.y)} {tooltipLabel}
              </strong>
            </div>
          );
        }}
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 170,
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
