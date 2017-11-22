export default ({ currentStep }) =>
  <div className='container'>
    <div className='steps'>
      <div className={`step-item ${currentStep !== 0 ? 'is-completed' : 'is-active'} is-info`}>
        <div className='step-marker'>
          <span className='icon'>
            <i className='fa fa-id-card' />
          </span>
        </div>
        <div className='step-details'>
          <p className='step-title is-info'>Profile</p>
        </div>
      </div>
      <div className={`step-item ${currentStep >= 2 ? 'is-completed' : (currentStep === 1 ? 'is-active' : '')} is-info`}>
        <div className='step-marker'>
          <span className='icon'>
            <i className='fa fa-gavel' />
          </span>
        </div>
        <div className='step-details'>
          <p className='step-title'>Underwriting</p>
        </div>
      </div>
      <div className={`step-item ${currentStep === 2 ? 'is-active' : ''} is-info`}>
        <div className='step-marker'>
          <span className='icon'>
            <i className='fa fa-credit-card' />
          </span>
        </div>
        <div className='step-details'>
          <p className='step-title'>Payment</p>
        </div>
      </div>
    </div>
  </div>;
