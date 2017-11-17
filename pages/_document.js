import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import stylesheet from 'styles/index.scss';
import Footer from '../components/footer';
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
          {/* Load font awesome and our external stylesheets */}
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          <div style={{flex: 1}}>
            <Main />
            <NextScript />
          </div>
          <Footer />
        </body>
      </html>
    );
  }
}
