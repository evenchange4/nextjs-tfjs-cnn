import * as React from 'react';
import debug from 'debug';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import postcss from '../utils/postcss';

const log = debug('app:_document');

class MyDocument extends Document<{}> {
  public render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" sizes="16x16" href="/static/images/favicon.ico" />
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
        </Head>
        <body>
          <Main />
          <NextScript />
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
