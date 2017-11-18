import Navbar from '../components/navbar';

export default () => (<div>
  <section className='hero'>
    <div className='hero-head'>
      <Navbar currentPage='/' />
    </div>
    <img style={{ width: '100vw', maxWidth: 'unset', paddingTop: '2em' }} src='static/hero-splash.svg' />
  </section>
  <section style={{ padding: 0 }} className='hero is-primary'>
    <div className='hero-body' >
      <div className='container has-text-centered'>
        <div style={{ padding: 0 }} className='hero-body'>
          <h1 className='title'>Dinosure</h1>
          <h2 className='subtitle'>Protection from the Triassic Tyranny<br /> A world 1<sup>st</sup></h2>
          <div className='container content'>
            No one expects a dinosaur attack.
            <div className='columns'>
              <div className='column'>A</div>
              <div className='column'>A</div>
              <div className='column'>A</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);
