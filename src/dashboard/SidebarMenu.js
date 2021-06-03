import React, { useState } from "react";
import clsx from "clsx";
import { subDays, format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WebIcon from "@material-ui/icons/Web";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LanguageIcon from "@material-ui/icons/Language";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
// local imports
import useApiDataFetch from "../hooks/useApiDataFetch";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  activeSites: {
    color: green[500]
  },
  inactiveSites: {
    color: red[500]
  }
}));

export default function SidebarMenu({ setDetailViewUrl, query, setQuery }) {
  const classes = useStyles();
  const [openSubmenu, setOpenSubmenu] = useState(true);
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(
    API_URL,
    query
  );

  const handleSubmenuClick = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const handleDetailView = url => {
    setDetailViewUrl(url);
    //setQuery("");
  };

  const handleReportFilter = daysAgo => {
    const startDate = subDays(new Date(), daysAgo);
    setQuery(prevQuery => ({
      ...prevQuery,
      startDate: startDate
    }));
  };

  const renderActiveSiteLink = item => {
    console.log(item);
    if (!item.is_active) {
      return null;
    }
    return (
      <ListItem
        button
        className={classes.nested}
        key={item.id}
        onClick={() => handleDetailView(item.url)}
      >
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    );
  };

  const renderInactiveSite = item => {
    console.log(item);
    if (item.is_active) {
      return null;
    }
    return (
      <ListItem className={classes.nested} key={item.id}>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    );
  };

  return (
    <div>
      <Divider />
      <List>
        <div>
          <ListItem button onClick={() => handleDetailView(null)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={handleSubmenuClick}>
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText primary="Research Sites" />
            {openSubmenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                className={clsx(classes.nested, classes.activeSites)}
                key={"active-sites"}
              >
                <ListItemText primary="Tracking Active" />
              </ListItem>
              {data && data.map(item => renderActiveSiteLink(item))}

              <ListItem
                className={clsx(classes.nested, classes.inactiveSites)}
                key={"inactive-sites"}
              >
                <ListItemText primary="Tracking Not Active" />
              </ListItem>
              {data && data.map(item => renderInactiveSite(item))}
            </List>
          </Collapse>
        </div>
      </List>
      <Divider />
      <List>
        <div>
          <ListSubheader inset>Reports</ListSubheader>
          <ListItem button onClick={() => handleReportFilter(7)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last week" />
          </ListItem>
          <ListItem button onClick={() => handleReportFilter(30)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last 30 days" />
          </ListItem>
          <ListItem button onClick={() => handleReportFilter(90)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last 90 days" />
          </ListItem>
        </div>
      </List>
    </div>
  );
}
