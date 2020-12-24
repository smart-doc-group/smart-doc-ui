import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { info } from '../../../mock-data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

type TMethod = 'get' | 'post' | 'put' | 'delete';

export interface IPaths {
  [x: string]: {
    // eslint-disable-next-line no-unused-vars
    [P in TMethod]?: {
      tags: string[];
      desc?: string;
      operationId?: string;
      parameters?: unknown;
      responses?: any;
      deprecated?: boolean;
    };
  };
}
export interface IInfo {
  tags: { name: string; description?: string }[];
  paths: IPaths;
}

const initData = (info: IInfo) => {
  const { tags, paths } = info;
  const tempData: any[] = [];
  tags.forEach((i, index) => {
    tempData[index] = {
      ...i,
      paths: [],
    };
    for (const j in paths) {
      if (paths[j].get) {
        if (paths[j].get.tags.includes(i.name)) {
          tempData[index].paths.push(paths[j].get);
        }
        if (paths[j].post) {
          tempData[index].paths.push(paths[j].post);
        }
        if (paths[j].put) {
          tempData[index].paths.push(paths[j].put);
        }
        if (paths[j].delete) {
          tempData[index].paths.push(paths[j].delete);
        }
      }
    }
  });
  return tempData;
};

const RequestList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [data] = useState<any>(initData(info));

  console.log(data);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {data.map((item: any) => (
        <Fragment key={item.name}>
          <ListItem button onClick={handleClick}>
            <ListItemText primary={item.name} secondary={item.description} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
};

export default RequestList;
