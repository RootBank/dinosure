export default ({ leftOption, rightOption, onLeft, onRight, instructions, onEither }) => (
  <div className='columns'>
    <div className='column is-hidden-mobile' />
    <div className='column'>
      <div style={{height: '8rem'}} className='level is-mobile'>
        <div className='level-item'>
          <button onClick={() => { if (onLeft) { onLeft(); } if (onEither) { onEither(); } }} className='button is-primary'>{leftOption}</button>
        </div>
        <div style={{ paddingTop: '4em' }} className='is-divider-vertical level-item' data-content='OR' />
        <div className='level-item'>
          <button onClick={() => { if (onRight) { onRight(); } if (onEither) { onEither(); } }} className='button is-primary'>{rightOption}</button>
        </div>
      </div>
      <p className='has-text-centered'>
        {instructions}
      </p>
    </div>
    <div className='column is-hidden-mobile' />
  </div>);
