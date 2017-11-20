import page from '../../components/page';
import FormFooter from '../../components/form-footer';

export default page(({ isAuthenticated, user }) =>
  <section className='section '>
    <div className='container content'>
      <h1 className='title'>Contact Details</h1>
      <p>We </p>
    </div>
  </section>,
  {
    footer: () => <FormFooter step={1} of={5} />
  }
);
