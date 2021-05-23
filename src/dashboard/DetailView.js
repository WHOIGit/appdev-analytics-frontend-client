import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
// local imports
import useApiDataFetch from "../hooks/useApiDataFetch";
import ChartTotalData from "../charts/ChartTotalData";
import ChartDataByUrl from "../charts/ChartDataByUrl";
import Title from "./Title";
import TableGaDataByCountry from "./TableGaDataByCountry";

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

export default function DetailView({ detailViewUrl, query }) {
  const classes = useStyles();
  const chartHeight = { height: 350 };
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(
    detailViewUrl,
    null
  );

  useEffect(() => {
    doFetch(`${detailViewUrl}${query}`);
  }, [detailViewUrl, query]);

  if (!data) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Grid item xs={12} className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Title>Total Data Downloads</Title>
              <ChartTotalData siteData={data} chartHeight={chartHeight} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Title>Data Downloads by URL</Title>
              <ChartDataByUrl
                siteData={data}
                dataMetric={"bytes_sent"}
                chartHeight={chartHeight}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TableGaDataByCountry data={data} />
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
