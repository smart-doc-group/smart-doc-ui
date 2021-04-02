import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { menuItemList } from 'src/mock-data/menu';

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

export interface IMenuItem {
  name: string;
  description?: string;
  id: number;
  collapsing: boolean;
}

const SideMenu = () => {
  const classes = useStyles();

  const [data] = useState(menuItemList);
  // be used to update list
  const [, setCount] = useState(0);

  const handleClick = (dataItem: IMenuItem) => {
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
            </ListItem>
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default SideMenu;
