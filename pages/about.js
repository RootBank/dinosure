import Navbar from '../components/navbar';

export default () => (
  <div>
    <Navbar currentPage='/about' />
    <section className='section' >
      <div className='container'>
        <h1 className='title'>About</h1>
      </div>
    </section>
  </div>
);
