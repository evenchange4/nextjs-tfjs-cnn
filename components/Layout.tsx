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
          <Box fontSize="body2.fontSize">
            Run inference on the browser to recognize dogs and cats with
            pre-trained CNN VGG16 model, so the image will not be uploaded to
            anywhere.
          </Box>
          <Box fontSize="caption.fontSize" color="text.hint" mb={1}>
            The model of Tensorflow.js will be <em>downloaded</em> when you
            upload an image at first time.
          </Box>
          {children}
        </Box>
        <Footer />
      </StickyFooterWrapper>
    </Box>
  );
});

export default Layout;
