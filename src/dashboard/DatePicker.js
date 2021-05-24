import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { subDays, format, isValid } from "date-fns";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListItem,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Checkbox,
  Tooltip
} from "@material-ui/core";
import { Restore } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({}));

const DEFAULT_START_DAYSAGO = process.env.REACT_APP_DEFAULT_START_DAYSAGO;
const defaultStartDate = subDays(new Date(), DEFAULT_START_DAYSAGO);
const defaultEndDate = new Date();

export default function DatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  query,
  setQuery
}) {
  console.log(startDate);
  console.log(endDate);
  const classes = useStyles();

  const onStartDateChange = date => {
    if (isValid(date)) {
      setStartDate(date);
      setQuery(prevQuery => ({
        ...prevQuery,
        startDate: date
      }));
    }
  };

  const onEndDateChange = date => {
    if (isValid(date)) {
      setEndDate(date);
      setQuery(prevQuery => ({
        ...prevQuery,
        endDate: date
      }));
    }
  };

  const onDateRangeReset = () => {
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setQuery(prevQuery => ({
      ...prevQuery,
      startDate: defaultStartDate,
      endDate: defaultEndDate
    }));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <List>
        <ListItem>
          <Tooltip
            title="Reset Dates"
            classes={{
              popper: classes.popper
            }}
          >
            <IconButton
              onClick={() => onDateRangeReset()}
              aria-label="expand"
              className={classes.resetBtn}
            >
              <Restore />
            </IconButton>
          </Tooltip>
          <FormControl component="fieldset">
            <FormGroup>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="start-date"
                label="Start Date"
                value={startDate}
                onChange={onStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "start date"
                }}
              />
            </FormGroup>
            <FormGroup>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="end-date"
                label="End Date"
                value={endDate}
                onChange={onEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "end date"
                }}
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    </MuiPickersUtilsProvider>
  );
}
