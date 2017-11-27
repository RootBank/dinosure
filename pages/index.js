import Link from 'next/link';
import page from '../components/page';

const homePage = page(() => [
  <section key='splash-mobile' className='hero is-hero-background-image is-hidden-mobile'>
    <div className='hero-body container'>
      <h1 className='title'>Become your familys Hero</h1>
      <h2 className='subtitle is-4'>Get your perfect life insurance.</h2>
      <a className='button is-large is-info' href='#subscriptions'>Lets get started</a>
    </div>
  </section>,
  <section key='splash' className='hero is-hidden-tablet'>
    <div className='hero-body container'>
      <h1 className='title'>Become your familys Hero</h1>
      <h2 className='subtitle is-4'>Understand what you need. Super easy to get.</h2>
      <a className='button is-large is-info'>Lets get started</a>
    </div>
  </section>,
  <section key='benefits' className='hero is-primary'>
    <div className='hero-body'>
      <div className='hero-body container has-text-centered'>
        <div className='columns'>
          <div className='column'>
            <div className='level' >
              <img className='image level-item is-128x128' src='/static/product-benefit-1.svg' />
            </div>
            <h5 className='title is-4'>Get on with your life</h5>
            <p>No paper, no quotes, <em>NO CALL CENTER</em> and covered immediately.</p>
          </div>
          <div className='column'>
            <div className='level' >
              <img className='image level-item is-128x128' src='/static/product-benefit-2.svg' />
            </div>
            <div>
              <h4 className='title is-4'>The most for your money</h4>
              <p>No broker commission (which could be as high as 30 subscriptions) and price-locked for 5 years.</p>
            </div>
          </div>
          <div className='column'>
            <div className='level' >
              <img className='image level-item is-128x128' src='/static/product-benefit-3.svg' />
            </div>
            <h4 className='title is-4'>You control everything</h4>
            <p>30 day money back guarantee, cancel at anytime and change whenever you want.</p>
          </div>
        </div>
      </div>
    </div>
  </section>,
  <section key='get-quote' className='hero is-primary' id='subscriptions'>
    <div className='hero-body'>
      <div className='container has-text-centered'>
        <h1 className='title'>Simple, transparent pricing.</h1>
        <h2 className='subtitle'>Always know what you’ll pay.</h2>
        <div className='columns'>
          <div className='column'>
            <div className='card'>
              <header className='card-header'>
                <h3 className='card-header-title is-centered is-5'>R 305 p/m for R 1 500 000</h3>
              </header>
              <div className='card-content'>
                <div className='content'>
                  Just get the basics in place for if something should happen to you tomorrow. Then well help you sort out the more complicated stuff.
                  <br />
                  <br />
                  <a href='#'>#imahero </a>
                  <a href='#'>#letsdothis</a>
                </div>
              </div>
              <footer className='card-footer is-bold'>
                <a href='#' className='card-footer-item button is-info is-outlined is-medium'>Pick me!</a>
              </footer>
            </div>
          </div>
          <div className='column'>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title is-centered is-5'>R 449 p/m for R 2 500 000</p>
              </header>
              <div className='card-content'>
                <div className='content'>
                  This is for the parents with 2 kids, ages from 3 - 12, wants to go to a public shool and later to university.
                  <br />
                  <br />
                  <a href='#'>#mykidsfuturesorted </a>
                  <a href='#'>#nomoreworries</a>
                </div>
              </div>
              <footer className='card-footer'>
                <a href='#' className='card-footer-item button is-info is-medium'>Pick me!</a>
              </footer>
            </div>
          </div>
          <div className='column'>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title is-centered is-5'>R 659 p/m for R 4 000 000</p>
              </header>
              <div className='card-content'>
                <div className='content'>
                  This is for the parents with 2 kids, ages from 3 - 12, wants to go to a private shool and later to university .
                  <br />
                  <br />
                  <a href='#'>#mykidsdreamsdone</a>
                </div>
              </div>
              <footer className='card-footer'>
                <Link prefetch href='/checkout/profile/name'><a className='card-footer-item button is-info is-outlined is-medium'>Pick me!</a></Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
]);

export default homePage;
