import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { PROJECT_NAME } from '../utils/constants';

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: '100%',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
);

const Header = React.memo(function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Box fontSize="h6.fontSize" flexGrow={1}>
          {PROJECT_NAME}
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
