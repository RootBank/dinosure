import Navbar from '../components/navbar';
import page from '../components/page-wrapper';

export default page(({isAuthenticated, user}) => (
  <div>
    <Navbar currentPage='/about' isAuthenticated={isAuthenticated} user={user} />
    <section className='section' >
      <div className='container'>
        <h1 className='title'>About</h1>
      </div>
    </section>
  </div>
));
