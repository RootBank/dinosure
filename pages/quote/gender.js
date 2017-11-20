import FormFooter from '../../components/form-footer';
import page from '../../components/page';

export default page(() =>
  <section className='section'>
    <div className='columns'>
      <div className='column' />
      <div className='column'>
        <div style={{height: '8rem'}} className='level is-mobile'>
          <div className='level-item'>
            <button className='button is-primary'>Female</button>
          </div>
          <div style={{ paddingTop: '4em' }} className='is-divider-vertical level-item' data-content='OR' />
          <div className='level-item'>
            <button className='button is-primary'>Male</button>
          </div>
        </div>
        <p className='has-text-centered'>
            What was the gender you were assigned at birth?
        </p>
      </div>
      <div className='column' />
    </div>
  </section>,
  { footer: () => <FormFooter step={2} of={3} /> }
);
