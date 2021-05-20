import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// local imports
import useApiDataFetch from "../hooks/useApiDataFetch";
import ChartTotalData from "../charts/ChartTotalData";
import ChartDataByUrl from "../charts/ChartDataByUrl";
import Title from "./Title";
import TableGaData from "./TableGaData";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

export default function DetailView({ url }) {
  const classes = useStyles();
  const chartHeight = { height: 350 };
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(url, null);

  if (!data) {
    return null;
  }
  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Title>Total Data Downloaded</Title>
          <ChartTotalData siteData={data} chartHeight={chartHeight} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Title>Data Download by URL</Title>
          <ChartDataByUrl siteData={data} chartHeight={chartHeight} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>Grid here</Paper>
      </Grid>
    </>
  );
}
