import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import Link from 'next/link';

export default page(() =>
  <section className='section'>
    <div className='columns'>
      <div className='column is-hidden-tablet is-hidden-mobile' />
      <div className='column has-text-centered'>
        <div className='is-hidden-mobile'><div className='level-item content title is-3'>
            I earn R <div style={{margin: '0.6em'}} className='control'>
              <input style={{width: '6em', textAlign: 'center'}} className='input title is-large' type='text' placeholder='income' />
            </div>
                per month
            </div>
        </div>
        <div className='is-hidden-desktop'>
          <h3 className='title is-3'>I earn</h3>
          <h3 style={{display: 'inline-flex'}} className='title is-3'><span style={{margin: '0.6em'}} className='is-vcentered'>R</span> <div style={{margin: '0.6em'}} className='control'>
            <input style={{width: '6em', textAlign: 'center'}} className='input title is-large' type='text' placeholder='income' />
          </div>
          </h3>
          <h3 className='title is-3'>per month</h3>
        </div>
      </div>
      <div className='column is-hidden-tablet is-hidden-mobile' />
    </div>
  </section>,
  {
    footer: () => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/quote/gender'><button className='button is-primary' disabled>Next</button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={1} of={3} />
    </div>
  }
);
