import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
            <link rel="stylesheet" type="text/css" href='/static/semantic.min.css' />
        </Head>        
        <body className="custom_class">          
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}