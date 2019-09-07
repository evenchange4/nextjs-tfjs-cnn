import * as React from 'react';
import { Box, Link } from '@material-ui/core';

const Footer = React.memo(function Footer() {
  return (
    <footer>
      <Box
        color="text.hint"
        fontSize="caption.fontSize"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}
        mt={3}
      >
        Made with&nbsp;
        <Box color="error.main">&hearts;&nbsp;</Box>
        by&nbsp;
        <Link
          href="https://michaelhsu.tw/"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          @evenchange4
        </Link>
      </Box>
    </footer>
  );
});

export default Footer;
