import Navbar from '../../components/navbar';
import page from '../../components/page-wrapper';

export default page(({user, isAuthenticated}) => (
  <div>
    <Navbar currentPage='/my-account' isAuthenticated={isAuthenticated} user={user} />
    <section className='section' >
      <div className='container'>
        <h1 className='title'>Welcome {user.name},</h1>
      </div>
    </section>
  </div>
));
