import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Tooltip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { info } from 'src/mock-data/request-list';
import { IconButton, ListItemSecondaryAction } from '@material-ui/core';
import CopyAlert from './CopyAlert';

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

export interface IDataItem {
  name: string;
  description?: string;
  collapsing: boolean;
  paths: {
    tags: string[];
    desc?: string;
    operationId?: string;
    parameters?: unknown;
    responses?: any;
    path: string;
    deprecated?: boolean;
    method: TMethod;
  }[];
}

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
  const tempData: IDataItem[] = [];
  tags.forEach((i, index) => {
    tempData[index] = {
      ...i,
      collapsing: false,
      paths: [],
    };
    for (const j in paths) {
      if (paths[j].get) {
        if (paths[j].get.tags.includes(i.name)) {
          tempData[index].paths.push({
            ...paths[j].get,
            path: j,
            method: 'get',
          });
        }
        if (paths[j].post) {
          tempData[index].paths.push({
            ...paths[j].post,
            path: j,
            method: 'post',
          });
        }
        if (paths[j].put) {
          tempData[index].paths.push({
            ...paths[j].put,
            path: j,
            method: 'put',
          });
        }
        if (paths[j].delete) {
          tempData[index].paths.push({
            ...paths[j].delete,
            path: j,
            method: 'delete',
          });
        }
      }
    }
  });
  return tempData;
};

const RequestInterfaceList = () => {
  const classes = useStyles();
  const [data] = useState<IDataItem[]>(initData(info));
  const [copyAlertOpen, setCopyAlertOpen] = useState(false);
  // be used to update list
  const [, setCount] = useState(0);

  const handleClick = (dataItem: IDataItem) => {
    dataItem.collapsing = !dataItem.collapsing;
    setCount((p) => p + 1);
  };

  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {data.map((item) => (
          <Fragment key={item.name}>
            <ListItem button onClick={() => handleClick(item)}>
              <ListItemText primary={item.name} secondary={item.description} />
              {!!item.paths.length ? (
                item.collapsing ? (
                  <IconButton color="inherit" edge="end" aria-label="comments">
                    <i className="iconfont icon-fold" />
                  </IconButton>
                ) : (
                  <IconButton color="inherit" edge="end" aria-label="comments">
                    <i className="iconfont icon-unfold" />
                  </IconButton>
                )
              ) : (
                <Tooltip title="There is no API here" placement="top" arrow>
                  <i className="iconfont icon-no-data" />
                </Tooltip>
              )}
            </ListItem>
            {!!item.paths.length && (
              <Collapse in={item.collapsing} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.paths.map((i, index) => (
                    // need to change `index` to other later
                    <ListItem
                      key={index}
                      button
                      className={classes.nested}
                      onClick={() => {
                        setCopyAlertOpen(true);
                        navigator.clipboard.writeText(i.path);
                      }}
                    >
                      <ListItemText primary={i.path} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => {
                            navigator.clipboard.writeText(i.path);
                          }}
                        >
                          <i className="iconfont icon-api-test" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => {
                            setCopyAlertOpen(true);
                            navigator.clipboard.writeText(i.path);
                          }}
                        >
                          <i className="iconfont icon-copy" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
      <CopyAlert open={copyAlertOpen} onClose={() => setCopyAlertOpen(false)} />
    </>
  );
};

export default RequestInterfaceList;
