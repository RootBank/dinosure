import Navbar from '../components/navbar';

export default () => (<div>
  <section className='hero is-info is-large'>
    <Navbar />
    <div className='hero-head' />
    <div className='hero-body'>
      <div className='container has-text-centered'>
        <p className='title'>Hooray!!</p>
        <p className='subtitle'>You're now signed in</p>
      </div>
    </div>

  </section>
</div>
);
