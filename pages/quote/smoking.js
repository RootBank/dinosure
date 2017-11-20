import FormFooter from '../../components/form-footer';
import page from '../../components/page';

export default page(() =>
  <section className='section'>
    <div className='columns'>
      <div className='column is-hidden-mobile' />
      <div className='column'>
        <div className='level is-mobile'>
          <div className='level-item'>
            <button className='button is-primary'>Smoking</button>
          </div>
          <div style={{ paddingTop: '4em' }} className='is-divider-vertical' data-content='OR' />
          <div className='level-item'>
            <button className='button is-primary'>Non-smoking</button>
          </div>
        </div>
        <p className='has-text-centered'>
            Please answer “Smoking” if you've smoked tobacco in the last year.
          </p>
      </div>
      <div className='column is-hidden-mobile' />
    </div>
  </section>,
    { footer: () => <FormFooter step={2} of={3} /> }
);
