import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// local imports
import ChartTotalData from "../charts/ChartTotalData";
import Title from "./Title";
import TableGaData from "./TableGaData";
import useApiDataFetch from "../hooks/useApiDataFetch";

const defaultQuery =
  "omit=download_results&metrics=screenPageViews,activeUsers";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

export default function HomeView({ query }) {
  const classes = useStyles();
  const chartHeight = { height: 250 };
  console.log(query);
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(
    `http://localhost:8000/api/websites/${query}`,
    null
  );

  useEffect(() => {
    let newQuery = query;
    if (!query.includes(defaultQuery)) {
      newQuery = query + "&" + defaultQuery;
    }
    doFetch(`http://localhost:8000/api/websites/${newQuery}`);
  }, [query]);

  const renderDataCharts = site => {
    return (
      <Paper className={classes.paper} key={site.id}>
        <Title>{site.name}</Title>
        <ChartTotalData siteData={site} chartHeight={chartHeight} />
      </Paper>
    );
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        {data && data.map(item => renderDataCharts(item))}
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {data && <TableGaData data={data} />}
        </Paper>
      </Grid>
    </>
  );
}
