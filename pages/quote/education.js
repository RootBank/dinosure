import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import Link from 'next/link';

export default page(() =>
  <section className='section'>
    <div className='columns'>
      <div className='column' />
      <div className='column'>
        <div className='content'>
          <div className='field'>
            <input className='is-checkradio' id='exampleRadioInline1' type='radio' name='exampleRadioInline' checked='checked' />
            <label for='exampleRadioInline1'>Up to Gr. 12</label>
          </div>
          <div className='field'>
            <input className='is-checkradio' id='exampleRadioInline1' type='radio' name='exampleRadioInline' checked='checked' />
            <label for='exampleRadioInline1'>Matric</label>
          </div>
          <div className='field'>
            <input className='is-checkradio' id='exampleRadioInline1' type='radio' name='exampleRadioInline' checked='checked' />
            <label for='exampleRadioInline1'>Diploma</label>
          </div>
          <div className='field'>
            <input className='is-checkradio' id='exampleRadioInline1' type='radio' name='exampleRadioInline' checked='checked' />
            <label for='exampleRadioInline1'>B Tech</label>
          </div>
          <div className='field'>
            <input className='is-checkradio' id='exampleRadioInline1' type='radio' name='exampleRadioInline' checked='checked' />
            <label for='exampleRadioInline1'>Undergraduate Degree</label>
          </div>
          <div className='field'>
            <input className='is-checkradio' id='exampleRadioInline1' type='radio' name='exampleRadioInline' checked='checked' />
            <label for='exampleRadioInline1'>Professional Degree</label>
          </div>
        </div>
        <p className='content has-text-centered'>
            Please select the highest level of education you have attained
          </p>
      </div>
      <div className='column' />
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
