import Navbar from '../components/navbar';
import page from '../components/page-wrapper';

export default page(({isAuthenticated, user}) => (<div>
  <section className='hero'>
    <div className='hero-head'>
      <Navbar isAuthenticated={isAuthenticated} user={user} currentPage='/' />
    </div>
    <img style={{ width: '100vw', maxWidth: 'unset', paddingTop: '2em' }} src='static/hero-splash.svg' />
  </section>
  <section className='hero is-primary'>
    <div className='hero-body' >
      <div className='hero-body'>
        <div className='container has-text-centered'>
          <h1 className='title'>Dinosure</h1>
          <h2 className='subtitle'>Protection from the Triassic Tyranny:<br /> a world 1<sup>st</sup></h2>
          <div className='container content'>
            <p>
            No one expects dinosaur attacks. So when they happen, they can be both devastating both to you and
            the ones you love. Dinosure is a best of breed insurance scheme which not only provides life and disability insurance for dinosaurs attacks,
            but also provides the following services to prevent that eventuality from ever ocurring.
            </p>
            <div className='columns'>
              <div className='column'>Early Warning Network</div>
              <div className='column'>Extraction Team</div>
              <div className='column'>Access to experts in</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className='hero is-primary'>
    <div className='hero-body' >
      <div className='container has-text-centered'>
        <h1 className='title'>Protection from<br /> R150 p/m</h1>
        <h1 className='subtitle'>Instant checkout</h1>
        <button className='button is-large is-info'>Get a Quote</button>
      </div>
    </div>
  </section>
</div>
));
