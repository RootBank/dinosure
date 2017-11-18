import Navbar from '../components/navbar';
import page from '../components/page-wrapper';

export default page(({isAuthenticated, user}) => (
  <div>
    <Navbar currentPage='/contact' isAuthenticated={isAuthenticated} user={user} />
    <section className='section' >
      <div className='container content'>
        <h1 className='title'>Contact Us</h1>
        <p>
          Dinosure is a registered insurance product. As such we have a responsibility to treat our customers fairly and timeously.
          If you are experiencing problems with our service, would like to appeal a claim, or simply have questions, you can
          contact us via the following channels:
          <ul>
            <li>email <a href='mailto:hello@dinosure.io'>hello@dinosure.io</a></li>
            <li>telephone <a href='tel:0835551337'>083 555 1337</a></li>
          </ul>
        </p>
        <p>
          If we have not sucessfully adressed your concerns, you can foward your issue to the <a href='http://www.ombud.co.za/'>Ombudsman for Long-term Insurance</a>.
        </p>
      </div>

    </section>

  </div>
));
