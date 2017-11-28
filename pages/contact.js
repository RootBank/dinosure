import page from '../components/page';

export default page(() => (
  <section className='section' >
    <div className='container content'>
      <h1 className='title'>Contact Us</h1>
      <p>
        Hero is a registered insurance product. As such we have a responsibility to treat our customers fairly and timeously.        If you are experiencing problems with our service, would like to appeal a claim, or simply have questions, you can
        contact us via the following channels:
      </p>
      <ul>
        <li>email <a href='mailto:hello@herolife.co.za'>hello@herolife.co.za</a></li>
        <li>telephone <a href='tel:+27875504246'>087 550 4246</a></li>
      </ul>
      <p>
        If we have not sucessfully adressed your concerns, you can foward your issue to the <a href='http://www.ombud.co.za/'>Ombudsman for Long-term Insurance</a>.
      </p>
    </div>
  </section>
));
