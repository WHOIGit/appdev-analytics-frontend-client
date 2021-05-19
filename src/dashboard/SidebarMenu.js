import React, { useState } from "react";
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
import StarBorder from "@material-ui/icons/StarBorder";
// local imports
import useApiDataFetch from "../hooks/useApiDataFetch";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function SidebarMenu({ setDetailViewUrl }) {
  const classes = useStyles();
  const [openSubmenu, setOpenSubmenu] = useState(true);
  const [{ data, isLoading, isError }, doFetch] = useApiDataFetch(
    "http://localhost:8000/api/websites/?fields=id,url,name",
    null
  );

  const handleSubmenuClick = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const handleDetailView = url => {
    console.log(url);
    setDetailViewUrl(url);
  };

  const renderSiteLink = item => {
    return (
      <ListItem
        button
        className={classes.nested}
        key={item.id}
        onClick={() => handleDetailView(item.url)}
      >
        <ListItemIcon>
          <StarBorder />
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
            <ListItemText primary="Websites" />
            {openSubmenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data && data.map(item => renderSiteLink(item))}
            </List>
          </Collapse>
        </div>
      </List>
      <Divider />
      <List>
        <div>
          <ListSubheader inset>Saved reports</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
          </ListItem>
        </div>
      </List>
    </div>
  );
}
