import * as React from 'react';
import debug from 'debug';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import postcss from '../utils/postcss';
import { PROJECT_NAME, PROJECT_DESC, PROJECT_LINK } from '../utils/constants';

const log = debug('app:_document');

class MyDocument extends Document<{}> {
  public render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="description" content={PROJECT_DESC} />
          <meta charSet="utf-8" />
          <link rel="icon" href="/static/images/favicon.ico" />
          {/* Note: Optimizing Google Fonts Performance https://www.smashingmagazine.com/2019/06/optimizing-google-fonts-performance/ */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="//fonts.gstatic.com/"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={PROJECT_LINK} />
          <meta property="og:title" content={PROJECT_NAME} />
          <meta property="og:image" content="/static/images/screenshot.png" />
          <meta property="og:description" content={PROJECT_DESC} />
          <meta property="og:site_name" content={PROJECT_NAME} />
          <meta property="og:locale" content="en_US" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@evenchange4" />
          <meta name="twitter:url" content={PROJECT_LINK} />
          <meta name="twitter:title" content={PROJECT_NAME} />
          <meta name="twitter:description" content={PROJECT_DESC} />
          <meta name="twitter:image" content="/static/images/screenshot.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="//www.google-analytics.com/analytics.js" />
          <script async src="//unpkg.com/autotrack@2.4.1/autotrack.js" />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheet = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    const css = await postcss(sheet.toString());

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}

          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </React.Fragment>
      ),
    };
  } catch (error) {
    log(error);
    throw error;
  }
};

export default MyDocument;
