export default ({ step, of: total }) =>
  <section className='section' style={{ paddingBottom: '4rem', paddingTop: 0 }}>
    <div className='container'>
      <div className='columns'>
        <div className='column' />
        <div className='column'>
          <div className='has-text-centered is-4'>{step === total ? 'Final step' : `Step ${step} of ${total}`}</div>
          <progress className='progress is-small is-info' value={step} max={total}>{Math.round(step / total * 100) | 0}%</progress>
        </div>
        <div className='column' />
      </div>
    </div>
  </section>;
