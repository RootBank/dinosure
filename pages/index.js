import Link from 'next/link';
import page from '../components/page';

const homePage = page(() => [
  <section key='splash' className='hero'>
    <img style={{ width: '100vw', maxWidth: 'unset', paddingTop: '2em' }} src='/static/hero-splash.svg' />
  </section>,
  <section key='benefits' className='hero is-primary'>
    <div className='hero-body' >
      <div className='hero-body container has-text-centered'>
        <h1 className='title'>Dinosure</h1>
        <h2 className='subtitle'>Protection from the Triassic Tyranny:<br /> a world 1<sup>st</sup></h2>
        <div className='container content'>
            No one expects dinosaur attacks. So when they happen, they can be both devastating both to you and
              the ones you love. Dinosure is a best of breed insurance scheme which not only provides life and disability insurance for dinosaurs attacks,
              but also provides the following services to prevent that eventuality from ever ocurring.
            </div>
        <div className='columns'>
          <div className='column'>
            <div className='level' >
              <img className='image level-item is-128x128' src='/static/product-benefit-1.svg' />
            </div>
            <h5 className='title is-5'>Early Warning Network</h5>
            <p>The best way to avoid an attack is not be there</p>
          </div>
          <div className='column'>
            <div className='level' >
              <img className='image level-item is-128x128' src='/static/product-benefit-2.svg' />
            </div>
            <div>
              <h4 className='title is-4'>Extraction Team</h4>
              <p>When the situation looks dire, we'll get you out <em>fast</em></p>
            </div>
          </div>
          <div className='column'>
            <div className='level' >
              <img className='image level-item is-128x128' src='/static/product-benefit-3.svg' />
            </div>
            <h4 className='title is-4'>Security Consultants</h4>
            <p>Our consultants will help make your home a fortress</p>
          </div>
        </div>
      </div>
    </div>
  </section>,
  <section key='get-quote' className='hero is-primary'>
    <div className='hero-body' >
      <div className='container has-text-centered'>
        <h1 className='title'>Protection from<br /> R149 p/m</h1>
        <h1 className='subtitle'>Instant checkout</h1>
        <Link href='/quote'>
          <button className='button is-large is-info'>Get a Quote</button>
        </Link>
      </div>
    </div>
  </section>
]);

export default homePage;
