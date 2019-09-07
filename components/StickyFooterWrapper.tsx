import * as React from 'react';
import { Box, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    footerSelector: {
      '& > footer': {
        marginTop: 'auto',
      },
    },
  }),
);

const StickyFooterWrapper: React.FC<{}> = React.memo(
  function StickyFooterWrapper(props) {
    const classes = useStyles();

    return (
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        flexGrow={1}
        className={classes.footerSelector}
        {...props}
      />
    );
  },
);

export default StickyFooterWrapper;
