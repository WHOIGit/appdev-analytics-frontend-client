import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function TableGaDataByCountry({ data }) {
  console.log(data);
  const classes = useStyles();

  if (!data) {
    return null;
  }

  // format GA data for tabular display
  const tableData = data.ga_results.rows.map(item => {
    const tableRow = {
      country: item.dimension_values[0].value,
      activeUsers: item.metric_values[0].value,
      screenPageViews: item.metric_values[1].value
    };
    return tableRow;
  });
  console.log(tableData);

  return (
    <React.Fragment>
      <Title>Google Analytics User Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Active Users</TableCell>
            <TableCell>Page Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.activeUsers}</TableCell>
              <TableCell>{row.screenPageViews}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
