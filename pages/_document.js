import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import stylesheet from 'styles/index.scss';

// This is the default document. All documents will include this code
export default class extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render () {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>Hero Life</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          {/* Load font awesome and our external stylesheets */}
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
          <link rel='icon' href='../static/favicon.ico' />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
