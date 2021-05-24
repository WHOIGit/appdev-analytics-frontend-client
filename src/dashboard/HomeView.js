import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

// local imports
import ChartTotalData from "../charts/ChartTotalData";
import Title from "./Title";
import TableGaData from "./TableGaData";
import useApiDataFetch from "../hooks/useApiDataFetch";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  loading: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

export default function HomeView({ query }) {
  const classes = useStyles();
  const chartHeight = { height: 250 };
  console.log(query);
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(
    API_URL,
    query
  );

  console.log(data);
  useEffect(() => {
    doFetch(API_URL, query);
  }, [query, doFetch]);

  const renderDataCharts = site => {
    return (
      <Grid item xs={12} md={4} key={site.id}>
        <Paper className={classes.paper}>
          <Title>{site.name}</Title>
          <ChartTotalData siteData={site} chartHeight={chartHeight} />
        </Paper>
      </Grid>
    );
  };

  return (
    <>
      {isLoading ? (
        <Grid item xs={12} className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {data && data.map(item => renderDataCharts(item))}

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {data && <TableGaData data={data} />}
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
