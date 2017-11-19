import Navbar from '../../components/navbar';
import Link from 'next/link';
import page from '../../components/page-wrapper';
import FormFooter from '../../components/form-footer';

export default page(
    ({ isAuthenticated, user }) => (<div>
      <Navbar currentPage='/claim' isAuthenticated={isAuthenticated} user={user} />
      <section className='section '>
        <div className='container content'>
          <h1 className='title'>Contact Details</h1>
          <p>We </p>
        </div>
      </section>
      <FormFooter step={1} of={5} />
    </div>)
);
