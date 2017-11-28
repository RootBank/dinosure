//  ##import Link from 'next/link';
import page from '../components/page';
import quoteStore from '../datastores/quote';
import Router from 'next/router';

const setSumAssured = (value) => {
  quoteStore.update(state => ({ ...state, sumAssured: value }));
  Router.push('/quote/summary');
};

const homePage = page(({quote}) => [
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
  <section key='benefits' className='section has-small-padding has-text-white has-background'>
    <div className='container has-text-centered'>
      <div className='columns'>
        <div className='column'>
          <div className='level' >
            <img className='image level-item is-128x128' src='/static/product-benefit-1.svg' />
          </div>
          <h4 className='title is-4 has-text-white'>Get on with your life</h4>
          <p>No paper, no quotes, <em>NO CALL CENTER</em> and covered immediately.</p>
        </div>
        <div className='column'>
          <div className='level' >
            <img className='image level-item is-128x128' src='/static/product-benefit-2.svg' />
          </div>
          <div>
            <h4 className='title is-4 has-text-white'>The most for your money</h4>
            <p>No broker commission (which could be as high as 30 subscriptions) and price-locked for 5 years.</p>
          </div>
        </div>
        <div className='column'>
          <div className='level' >
            <img className='image level-item is-128x128' src='/static/product-benefit-3.svg' />
          </div>
          <h4 className='title is-4 has-text-white'>You control everything</h4>
          <p>30 day money back guarantee, cancel at anytime and change whenever you want.</p>
        </div>
      </div>
    </div>
  </section>,
  <section key='get-quote' className='section has-large-padding' id='subscriptions'>
    <div className='container has-text-centered'>
      <h1 className='title'>Simple, transparent pricing.</h1>
      <h2 className='subtitle'>Always know what you’ll pay.</h2>
      <div className='pricing-table'>
        <div className='pricing-plan'>
          <div className='plan-header'>Starter</div>
          <div className='plan-price'>
            <span className='plan-price-amount'>
              <span className='plan-price-currency'>R</span>305
            </span>/month
          </div>
          <div className='plan-items'>
            <div className='plan-item'>
              <span className='plan-price-amount'>
                <span style={{ fontSize: '1.5em', fontWeight: '700' }}>R 1.5 million</span> life cover
              </span>
            </div>
            <div className='plan-item'>Get the basics in place for if something should happen to you tomorrow</div>
          </div>
          <div className='plan-footer'>
            <button className='button is-fullwidth' onClick={(() => setSumAssured(1500000))}>Choose</button>
          </div>
        </div>
        <div className='pricing-plan is-info'>
          <div className='plan-header'>Core</div>
          <div className='plan-price'>
            <span className='plan-price-amount'>
              <span className='plan-price-currency'>R</span>449
            </span>/month
          </div>
          <div className='plan-items'>
            <div className='plan-item'>
              <span className='plan-price-amount'>
                <span style={{ fontSize: '1.5em', fontWeight: '700' }}>R 2.5 million</span> life cover
              </span>
            </div>
            <div className='plan-item'>This is for the parents with 2 kids, ages from 3 - 12, wants to go to a public shool and later to university.</div>
          </div>
          <div className='plan-footer'>
            <button className='button is-fullwidth' onClick={(() => setSumAssured(2500000))}>Choose</button>
          </div>
        </div>
        <div className='pricing-plan'>
          <div className='plan-header'>Premium</div>
          <div className='plan-price'>
            <span className='plan-price-amount'>
              <span className='plan-price-currency'>R</span>659
            </span>/month
          </div>
          <div className='plan-items'>
            <div className='plan-item'>
              <span className='plan-price-amount'>
                <span style={{ fontSize: '1.5em', fontWeight: '700' }}>R 4 million</span> life cover
              </span>
            </div>
            <div className='plan-item'>This is for the parents with 2 kids, ages from 3 - 12, wants to go to a public shool and later to university.</div>
          </div>
          <div className='plan-footer'>
            <button className='button is-fullwidth' onClick={(() => setSumAssured(4000000))}>Choose</button>
          </div>
        </div>
      </div>
    </div>
  </section>
]);

export default homePage;
