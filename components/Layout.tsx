import * as React from 'react';
import { Box, Toolbar } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import StickyFooterWrapper from './StickyFooterWrapper';

const Layout = React.memo(function Layout({ children }) {
  return (
    <Box>
      <Header />
      <StickyFooterWrapper>
        <Toolbar />
        <Box p={3}>
          <Box fontSize="caption.fontSize" fontStyle="italic" mb={1}>
            This application only inference in your browser to recognize dogs
            and cats with trained CNN VGG16 model, so the image will not be
            uploaded to anywhere.
          </Box>
          {children}
        </Box>
        <Footer />
      </StickyFooterWrapper>
    </Box>
  );
});

export default Layout;
