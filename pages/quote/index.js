import Link from 'next/link';
import FormFooter from '../../components/form-footer';
import page from '../../components/page';

export default page(() =>
  <div>
    <section className='section'>
      <div className='container content'>
        <h1 className='title'>Select Cover</h1>
        <p>
        Please select the amount of cover you require. This is the sum that will be paid out should your life be terminated by dinosaur.
      </p>
        <div className='columns'>
          <div className='column' />
          <div className='column has-text-centered'>
            <h3 className='title is-h3'>R 5 000 000</h3>
            <input className='slider is-fullwidth is-info' step='500000' min='500000' max='10000000' value='5000000' type='range' />
            <h5>sum assured</h5>
          </div>
          <div className='column' />
        </div>
      </div>
    </section>
  </div>,
  {
    footer: () =>
      <div>
        <section className='section'>
          <div className='level form-nav'>
            <div className='level-item'>
              <Link href='/'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
              <Link href='/quote/lifestyle'><button className='button is-primary'>Next</button></Link>
            </div>
          </div>
        </section>
        <FormFooter step={1} of={3} />
      </div>
  }
);
