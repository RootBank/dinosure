import Navbar from '../components/navbar';

export default () => (<div>
  <section className='hero '>
    <Navbar />
    <div className='hero-head' />
    <div style={{ paddingLeft: 0, paddingRight: 0 }} className='hero-body'>
      <img style={{ width: '100vw', maxWidth: 'unset' }} src='static/hero-splash.svg' />
    </div>

  </section>
</div>
);
