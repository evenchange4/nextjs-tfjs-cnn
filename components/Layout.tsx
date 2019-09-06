import * as React from 'react';
import { Box, Toolbar } from '@material-ui/core';
import Header from './Header';

const Layout = React.memo(function Layout({ children }) {
  return (
    <Box>
      <Header />
      <Toolbar />
      <Box p={3}>{children}</Box>
    </Box>
  );
});

export default Layout;
