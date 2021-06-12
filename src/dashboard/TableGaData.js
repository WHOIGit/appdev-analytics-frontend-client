import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import useApiDataFetch from "../hooks/useApiDataFetch";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function TableGaData({ query }) {
  const classes = useStyles();
  // set API query parameters to load GA data only,
  // defer GA data load to Table component
  const tableQuery = {
    ...query,
    fields: "id,name,is_active,ga_results"
  };
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(
    API_URL,
    tableQuery
  );
  const [tableData, seTableData] = useState();

  console.log(data);
  useEffect(() => {
    doFetch(API_URL, query);
  }, [query, doFetch]);

  useEffect(() => {
    // format GA data for tabular display
    if (data) {
      const newTableData = data
        .filter(item => item.is_active)
        .map(item => {
          const tableRow = {
            site: item.name,
            topCountry: "",
            activeUsers: "",
            pageViews: ""
          };
          if (!item.ga_results.rows.length) {
            return tableRow;
          }
          tableRow.topCountry =
            item.ga_results.rows[0].dimension_values[0].value;

          const activeUsers = item.ga_results.rows
            .map(row => parseInt(row.metric_values[0].value))
            .reduce((a, b) => a + b, 0);
          tableRow.activeUsers = activeUsers;

          const pageViews = item.ga_results.rows
            .map(row => parseInt(row.metric_values[1].value))
            .reduce((a, b) => a + b, 0);
          tableRow.pageViews = pageViews;

          return tableRow;
        });
      console.log(newTableData);
      seTableData(newTableData);
    }
  }, [data]);

  if (!tableData) {
    return null;
  }
  return (
    <React.Fragment>
      <Title>Google Analytics User Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Site</TableCell>
            <TableCell>Active Users</TableCell>
            <TableCell>Page Views</TableCell>
            <TableCell>Top Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.site}</TableCell>
              <TableCell>{row.activeUsers}</TableCell>
              <TableCell>{row.pageViews}</TableCell>
              <TableCell>{row.topCountry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
