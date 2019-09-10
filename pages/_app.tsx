/* global document */
import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { hijackEffects } from 'stop-runaway-react-effects';
import theme from '../utils/theme';
import { PROJECT_NAME, GA_ID } from '../utils/constants';
import autotrack from '../utils/autotrack';

/**
 * Catches situations when a react use(Layout)Effect runs repeatedly in rapid succession
 */
if (process.env.NODE_ENV !== 'production') {
  hijackEffects();
}

class MyApp extends App {
  static displayName = 'MyApp';

  public componentDidMount() {
    autotrack(GA_ID);
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{PROJECT_NAME}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
