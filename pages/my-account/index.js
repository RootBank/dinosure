import Navbar from '../../components/navbar';
import page from '../../components/page-wrapper';

export default page(({user, isAuthenticated}) => (
  <div>
    <Navbar currentPage='/my-account' isAuthenticated={isAuthenticated} user={user} />
    <section className='section' >
      <div className='container'>
        <h1 className='title'>Welcome {user.name},</h1>
        <div className='content'>
          <h3>Contact Details</h3>
          <table className='table'>
            <tbody>
              <tr><th>Email</th><th>nick@cuthbert.co.za</th><th className='has-text-right'><button className='button is-primary is-inverted'>edit</button></th></tr>
              <tr><th>Tel Number</th><th>0835551337</th><th className='has-text-right'><button className='button is-primary is-inverted'>edit</button></th></tr>
              <tr><th>Postal Address</th><th>34 Fraser St<br />Hunters Home<br />Knysna<br />6570</th><th className='has-text-right'><button className='button is-primary is-inverted'>edit</button></th></tr>
            </tbody>
          </table>
        </div>
        <div className='content'>
          <h3>Payment Methods</h3>
        </div>
        <div className='content'>
          <h3>Policies</h3>
        </div>
      </div>
    </section>
  </div>
));
