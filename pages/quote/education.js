import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';
import React from 'react';

const setEducation = (event) => {
  quoteStore.update(state => ({ ...state, education: event.target.name }));
};

export default page(({ quote = { education: false } }) =>
  <section className='section'>
    <div className='columns'>
      <div className='column' />
      <div className='column'>
        <div className='content'>
          <div className='field'>
            <input onChange={setEducation} className='is-checkradio' id='grade_12_no_matric' type='radio' name='grade_12_no_matric' checked={quote.education === 'grade_12_no_matric'} />
            <label htmlFor='grade_12_no_matric'>Up to Gr. 12</label>
          </div>
          <div className='field'>
            <input onChange={setEducation} className='is-checkradio' id='grade_12_matric' type='radio' name='grade_12_matric' checked={quote.education === 'grade_12_matric'} />
            <label htmlFor='grade_12_matric'>Matric</label>
          </div>
          <div className='field'>
            <input onChange={setEducation} className='is-checkradio' id='diploma' type='radio' name='diploma' checked={quote.education === 'diploma'} />
            <label htmlFor='diploma'>Diploma</label>
          </div>
          <div className='field'>
            <input onChange={setEducation} className='is-checkradio' id='btech' type='radio' name='btech' checked={quote.education === 'btech'} />
            <label htmlFor='btech'>BTech</label>
          </div>
          <div className='field'>
            <input onChange={setEducation} className='is-checkradio' id='undergraduate_degree' type='radio' name='undergraduate_degree' checked={quote.education === 'undergraduate_degree'} />
            <label htmlFor='undergraduate_degree'>Undergraduate Degree</label>
          </div>
          <div className='field'>
            <input onChange={setEducation} className='is-checkradio' id='professional_degree' type='radio' name='professional_degree' checked={quote.education === 'professional_degree'} />
            <label htmlFor='professional_degree'>Professional Degree</label>
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
    footer: class extends React.Component {
      constructor (props) {
        super(props);
        this.state = { nextDisabled: true };
      }
      componentWillReceiveProps (nextProps) {
        this.setState({ nextDisabled: !nextProps.quote || !nextProps.quote.education });
      }
      render () {
        return <div>
          <section className='section'>
            <div className='level form-nav'>
              <div className='level-item'>
                <Link prefetch href='/quote/age'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
                <Link prefetch href='/quote/income'><button className='button is-primary' disabled={this.state.nextDisabled}>Next</button></Link>
              </div>
            </div>
          </section>
          <FormFooter step={4} of={6} />
        </div>;
      }
    },
    datastores: { quote: quoteStore }
  }
);
